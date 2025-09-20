from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import Base
from .database import engine

#For Auth and todos from routers:
from .routers import auth, movies

app = FastAPI()

# origins = [
#     "http://localhost:5173",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://movie-catalogue-frontend-jq4e.onrender.com"],        
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

#For Auth and todos from routers:
app.include_router(auth.router)
app.include_router(movies.router)
