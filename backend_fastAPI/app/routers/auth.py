from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

# after installing python-multipart
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

# for JWT
from jose import jwt, JWTError

from ..database import SessionLocal
from ..models import Users

from passlib.context import CryptContext
from typing import Annotated
from starlette import status
from datetime import timedelta, datetime, timezone

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

# for password hashing
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

# to verify JWT/user
oauth2_bearer = OAuth2PasswordBearer(tokenUrl = 'auth/token')

# for JWT
SECRET_KEY = 'supersecret'
ALGORITHM = 'HS256'
 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: int, role: str, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id, 'role': role}
    expires = datetime.now(timezone.utc) +  expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

# => verify the user JWT
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        user_role: str = payload.get('role')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
        return {'username': username,  'id': user_id, 'user_role': user_role}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')

# => Pydantic for user data validation
class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr = Field(...)
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    password: str = Field(..., min_length=6)
    role: str = Field(default="user")

# => Pydantic for JWT validation
class Token(BaseModel):
    access_token: str
    token_type: str

# => Creating a User
@router.post('/login', status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency,create_user_request: CreateUserRequest):

    # Error since the BaseModel subclass has password and the actual table has hashed password
    # create_user_model = Users(**create_user_request.model_dump())

    create_user_model = Users(
        email = create_user_request.email,
        username = create_user_request.username,
        first_name = create_user_request.first_name,
        last_name = create_user_request.last_name,
        role = create_user_request.role,
        hashed_password = bcrypt_context.hash(create_user_request.password),
        is_active = True,
    )

    db.add(create_user_model)
    try: 
        db.commit()
        db.refresh(create_user_model)
        return {'msg': 'User created successfully'}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail='User with this email or username already exists.'
        )

# => Using token for Authentication
@router.post('/token', response_model = Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    token = create_access_token(user.username, user.id, user.role, timedelta(minutes=30))
    return {'access_token': token, 'token_type': 'bearer'}
