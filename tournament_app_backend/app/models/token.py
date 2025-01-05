from typing import Annotated

from pydantic import BaseModel
from fastapi.param_functions import Form

class TokenModel(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

class RefreshTokenInputModel:
    def __init__(
        self,
        refresh_token: Annotated[
            str,
            Form()
        ]
    ) -> None:
        self.refresh_token = refresh_token