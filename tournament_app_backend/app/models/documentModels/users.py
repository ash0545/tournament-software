from beanie import Document


class UserDBModel(Document):
    uid: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

    class Settings:
        name = "users"
