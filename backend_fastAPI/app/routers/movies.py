from fastapi import Depends, HTTPException, Path, APIRouter
from pydantic import BaseModel
from starlette import status

from ..models import Movies
from sqlalchemy.orm import Session
from ..database import SessionLocal
from typing import Annotated, List

from .auth import get_current_user

router = APIRouter(
    prefix='/movies',
    tags=['movies']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

# => Pydantic for data validation
class MoviesRequest(BaseModel):
    tmdb_id: int
    title: str
    poster_path: str
    rating: float
    popularity: float
    release_date: str
    original_language: str

    class Config:
        from_attributes = True

# => GET METHOD
@router.get('/getMovies', status_code = status.HTTP_200_OK, response_model=List[MoviesRequest])
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')
    return db.query(Movies).filter(user.get('id') == Movies.owner_id).all()

# @router.get('/{movie_id}', status_code = status.HTTP_200_OK)
# async def read_movie(user: user_dependency, db: db_dependency, movie_id: int = Path(gt=0)):
#     if user is None:
#         raise HTTPException(status_code=401, detail='Authentication Failed!')
#     movie_model = db.query(Movies).filter(Movies.id == movie_id).filter(Movies.owner_id == user.get('id')).first()
#     if movie_model is not None:
#         return movie_model
#     raise HTTPException(status_code=404, detail='Movie not found.')

# => POST METHOD
@router.post('/addMovie', status_code=status.HTTP_201_CREATED)
async def create_movie(user: user_dependency, db: db_dependency, movie_request: MoviesRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')
    movie_model = Movies(**movie_request.model_dump(), owner_id = user.get('id'))
    # to add new data in the DataBase
    db.add(movie_model)
    db.commit()

# => PUT METHOD
# @router.put('/update/{movie_id}', status_code=status.HTTP_204_NO_CONTENT)
# async def update_todo(user: user_dependency, db: db_dependency, movie_update: MoviesRequest,movie_id: int = Path(gt=0)):
#     if user is None:
#         raise HTTPException(status_code=401, detail='Authentication Failed!')
#     movie_model = db.query(Movies).filter(Movies.id == movie_id).filter(Movies.owner_id == user.get('id')).first()
#     if movie_model is None:
#         raise HTTPException(status_code=404, detail='Todo not found.')
#     # to update data in the DataBase
#     movie_model.title = movie_update.title
#     movie_model.description = movie_update.description
#     movie_model.priority = movie_update.priority
#     movie_model.complete = movie_update.complete
#     db.add(movie_model)
#     db.commit()

# => DELETE METHOD
@router.delete('/delete/{movie_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_movie(user: user_dependency, db: db_dependency, movie_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')
    movie_model = db.query(Movies).filter(Movies.tmdb_id == movie_id).filter(Movies.owner_id == user.get('id')).first()
    if movie_model is None:
        raise HTTPException(status_code=404, detail='Todo not found.')
    # to delete data in the DataBase
    db.query(Movies).filter(Movies.tmdb_id == movie_id).filter(Movies.owner_id == user.get('id')).delete()
    db.commit()
    