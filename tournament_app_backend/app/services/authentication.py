from typing import Annotated
from venv import logger

from fastapi import Depends, HTTPException, status
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)

from models.user import UserModel

from services.userService import get_user

from firebase_admin.auth import verify_id_token

bearer_scheme = HTTPBearer(auto_error=False)


def verify_firebase_token(
    token: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> dict | None:
    """
    Verifies the Firebase JWT token.

    Args:
        token: The bearer token.

    Returns:
        dict: The decoded token.

    Raises:
        HTTPException: If or token is invalid or expired.
    """
    try:
        decoded_token = verify_id_token(token.credentials)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )


async def get_current_user(
    token: Annotated[dict, Depends(verify_firebase_token)]
) -> UserModel:
    """
    Retrieves the current user based on provided Firebase token.

    Args:
        token (Annotated[str, Depends(oauth2_scheme)]): The token to decode.

    Returns:
        UserModel: The UserModel object associated with the token.

    Raises:
        HTTPException: If the token is invalid or the user does not exist.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        uid: str = token["uid"]
        if uid is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    user = await get_user(uid=uid)
    if user is None:
        raise credentials_exception
    return user
