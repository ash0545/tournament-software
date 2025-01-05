from typing import Annotated
from pydantic import BaseModel


class UserModel(BaseModel):
    uid: str
    email: str | None = None
    full_name: str
