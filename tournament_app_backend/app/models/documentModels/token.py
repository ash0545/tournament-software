import datetime
from beanie import Document

class AccessTokenBDModel(Document):
    token_id: str
    username: str
    expires: datetime.datetime

    class Settings:
        name = "refresh_tokens"
        indexes = ["username"]