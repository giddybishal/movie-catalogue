from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os 

DATABASE_URL = os.environ.get("DATABASE_URL")

# DATABASE_URL = 'postgresql://postgres:bishal@localhost/MovieCatalogueDatabase'

# Render gives "postgres://", but SQLAlchemy needs "postgresql://"
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
