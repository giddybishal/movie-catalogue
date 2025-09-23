from .database import Base
from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

# --- Users Table ---
class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String)

    # A user can have many linked movies
    movies = relationship("UserMovies", back_populates="user")

# --- Movies Table ---
class Movies(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)  # Internal DB ID
    tmdb_id = Column(Integer, index=True)              # TMDB API ID
    title = Column(String)
    poster_path = Column(String, nullable=True)
    rating = Column(Float)
    popularity = Column(Float)
    release_date = Column(String)
    original_language = Column(String)

    # A movie can belong to many users
    users = relationship("UserMovies", back_populates="movie")

# --- Linking Table ---
class UserMovies(Base):
    __tablename__ = "user_movies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    movie_id = Column(Integer, ForeignKey("movies.id", ondelete="CASCADE"))

    # Flags for different actions
    favourite = Column(Boolean, default=False)
    watch_later = Column(Boolean, default=False)

    # => Extra stuff for later
    # note = Column(String, nullable=True)
    # review = Column(String, nullable=True)

    # Relationships back to parent tables
    user = relationship("Users", back_populates="movies")
    movie = relationship("Movies", back_populates="users")
    

# => SQL command

# -- Drop old tables
# DROP TABLE IF EXISTS user_movies;
# DROP TABLE IF EXISTS movies;
# DROP TABLE IF EXISTS users;

# -- Users Table
# CREATE TABLE users (
#     id SERIAL PRIMARY KEY,
#     email VARCHAR(200) UNIQUE,
#     username VARCHAR(100) UNIQUE,
#     first_name VARCHAR(100),
#     last_name VARCHAR(100),
#     hashed_password VARCHAR(200),
#     is_active BOOLEAN DEFAULT TRUE,
#     role VARCHAR(50)
# );

# -- Movies Table
# CREATE TABLE movies (
#     id SERIAL PRIMARY KEY,
#     tmdb_id INTEGER,
#     title VARCHAR(200),
#     poster_path VARCHAR(200),
#     rating FLOAT,
#     popularity FLOAT,
#     release_date VARCHAR(20),
#     original_language VARCHAR(10)
# );

# -- User-Movies Linking Table
# CREATE TABLE user_movies (
#     id SERIAL PRIMARY KEY,
#     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
#     movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
#     favourite BOOLEAN DEFAULT FALSE,
#     watch_later BOOLEAN DEFAULT FALSE,
#     note TEXT,
#     review TEXT
# );
