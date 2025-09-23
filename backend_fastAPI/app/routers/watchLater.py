from fastapi import Depends, HTTPException, Path, APIRouter
from pydantic import BaseModel
from starlette import status

from ..models import Movies, UserMovies
from sqlalchemy.orm import Session
from ..database import SessionLocal
from typing import Annotated, List

from .auth import get_current_user

router = APIRouter(
    prefix='/watchLater',
    tags=['watchLater']
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
@router.get('/getWatchLater', status_code = status.HTTP_200_OK, response_model=List[MoviesRequest])
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')
    # Explicit join between Movies and UserMovies
    watch_later_movies = (
        db.query(Movies)
        .join(UserMovies, UserMovies.movie_id == Movies.id)
        .filter(UserMovies.user_id == user.get("id"))
        .filter(UserMovies.watch_later == True)
        .all()
    )
    return watch_later_movies

# => POST METHOD
@router.post('/addWatchLater', status_code=status.HTTP_201_CREATED)
async def create_movie(user: user_dependency, db: db_dependency, movie_request: MoviesRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')

    # Check if movie already exists
    movie_model = db.query(Movies).filter(Movies.tmdb_id == movie_request.tmdb_id).first()
    if not movie_model:
        # Create new movie in DB
        movie_model = Movies(**movie_request.model_dump())
        db.add(movie_model)
        db.commit()
        db.refresh(movie_model)

    # Check if UserMovies entry already exists
    user_movie = (
        db.query(UserMovies)
        .filter(UserMovies.user_id == user.get("id"))
        .filter(UserMovies.movie_id == movie_model.id)
        .first()
    )
    if not user_movie:
        # Create linking entry
        user_movie = UserMovies(
            user_id=user.get("id"),
            movie_id=movie_model.id,
            watch_later=True
        )
        db.add(user_movie)
    else:
        # If it exists but watch_later=False, update it
        user_movie.watch_later = True

    db.commit()
    return {"detail": "Movie added to watch later"}

# => DELETE METHOD
@router.delete('/deleteWatchLater/{tmdb_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_movie(user: user_dependency, db: db_dependency, tmdb_id: int = Path(gt=-1)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed!')

    # Get movie
    movie_model = db.query(Movies).filter(Movies.tmdb_id == tmdb_id).first()
    if not movie_model:
        raise HTTPException(status_code=404, detail='Movie not found.')

    # Delete the linking entry
    user_movie = (
        db.query(UserMovies)
        .filter(UserMovies.user_id == user.get("id"))
        .filter(UserMovies.movie_id == movie_model.id)
        .first()
    )
    if not user_movie or not user_movie.watch_later:
        raise HTTPException(status_code=404, detail='Movie not in watch later.')

    user_movie.watch_later = False

    if not (user_movie.favourite or user_movie.watch_later):
        db.delete(user_movie)
    db.commit()

    return {"detail": "Movie removed from watch later"}
