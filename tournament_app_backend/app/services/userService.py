from models.documentModels.users import UserDBModel
from models.user import UserModel
from exceptions.userExceptions import UserAlreadyExistsException


async def get_user(uid: str) -> UserModel | None:
    """
    Asynchronously retrieves a user from the database using the provided uid.

    Args:
        uid (str): The uid of the user to retrieve.

    Returns:
        UserModel | None: A UserModel object if a user with the provided uid exists, None otherwise.
    """
    if uid is None:
        return None

    user = await UserDBModel.find_one(UserDBModel.uid == uid)
    if user is None:
        return None
    user_dict = user.model_dump()
    return UserModel(**user_dict)


async def create_user(user: UserModel) -> UserModel:
    """
    Asynchronously creates a new user in the database using the provided user model and hashed password.

    Args:
        user (UserModel): The user model object containing the details of the user to be created.

    Returns:
        UserModel: The created user model object, excluding the hashed password.

    Raises:
        UserAlreadyExistsException: If a user with the provided username already exists in the database.
    """
    user_in_db = await UserDBModel.find_one(UserDBModel.uid == user.uid)
    if user_in_db is not None:
        raise UserAlreadyExistsException()

    user_dict = user.model_dump()

    inserted_user = await UserDBModel(**user_dict).insert()
    inserted_user_dict = inserted_user.model_dump()
    return UserModel(**inserted_user_dict)
