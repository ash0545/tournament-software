import logging

from config import config_manager
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from models import __document_models__
from routers.events import router as eventsRouter
from routers.auth import router as AuthRouter

from fastapi_pagination import add_pagination

from firebase_admin import credentials, initialize_app

logging.basicConfig(
    level=logging.INFO,
    format="%(module)s %(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

mongo_connection_str = config_manager.get("MONGO_CONNECTION_STRING")
mongo_database = config_manager.get("MONGO_DATABASE")


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncIOMotorClient(mongo_connection_str)
    await init_beanie(
        database=client[mongo_database], document_models=__document_models__
    )
    yield
    client.close()


cred = credentials.Certificate(
    config_manager.get("FIREBASE_PATH_TO_SERVICE_ACCOUNT_KEY")
)
logger.info("Initializing Firebase")
firebase = initialize_app(cred)
logger.info("Firebase initialized")

app = FastAPI(lifespan=lifespan)
add_pagination(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(eventsRouter)
app.include_router(AuthRouter)
