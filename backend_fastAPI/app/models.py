from .database import Base
from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index = True)
    email = Column(String, unique = True)
    username = Column(String, unique = True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default = True)
    role = Column(String)

class Movies(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True, index=True)
    tmdb_id = Column(Integer, index=True)
    title = Column(String)
    poster_path = Column(String, nullable=True)
    rating = Column(Float)
    popularity = Column(Float)
    release_date = Column(String)
    original_language = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))
    
# DROP TABLE IF EXISTS movies;
# DROP TABLE IF EXISTS users;

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

# CREATE TABLE movies (
#     id SERIAL PRIMARY KEY,
#     tmdb_id INTEGER,
#     title VARCHAR(200),
#     poster_path VARCHAR(200),
#     rating FLOAT,
#     popularity FLOAT,
#     release_date VARCHAR(20),
#     original_language VARCHAR(10),
#     owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
# );
