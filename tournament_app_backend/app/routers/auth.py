import logging
from typing import Annotated

from fastapi import Depends
from fastapi.routing import APIRouter
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from models.notFound import NotFoundModel
from models.user import UserModel

from services.userService import create_user, get_user
from services.authentication import verify_firebase_token
from exceptions.userExceptions import UserAlreadyExistsException

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth", tags=["auth"], responses={404: NotFoundModel().model_dump()}
)

bearer_scheme = HTTPBearer(auto_error=False)


@router.post("/google-login")
async def auth_google(
    token: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> UserModel:
    """
    Verifies ID token generated after signing-in with Google.

    Args:
        token (HTTPAuthorizationCredentials): The Bearer token.

    Returns:
        UserModel: Details of the verified user.
    """
    decoded_token = verify_firebase_token(token)
    user_model = UserModel(
        uid=decoded_token["uid"],
        full_name=decoded_token["name"],
        email=decoded_token["email"],
    )
    try:
        user = await create_user(user_model)
        logger.info(f"User {user.full_name} created.")
    except UserAlreadyExistsException:
        user = await get_user(uid=decoded_token["uid"])
        logger.info(f"User {user.full_name} retrieved.")
    return user
