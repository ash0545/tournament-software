import logging

from beanie.odm.fields import PydanticObjectId

from exceptions.httpExceptions.tournamentExceptions import (
    TournamentNotFoundHTTPException,
    TournamentForbiddenHTTPException,
)
from exceptions.tournamentExceptions import (
    TournamentNotFoundException,
    TournamentForbiddenException,
)

from fastapi.routing import APIRouter
from fastapi import status, Depends, Path

from fastapi_pagination import Page
from fastapi_pagination.customization import CustomizedPage, UseParamsFields

from models.user import UserModel
from models.tournament import (
    TournamentModel,
    TournamentCreatedModel,
    TournamentResponseModel,
)
from models.notFound import NotFoundModel

from services.authentication import get_current_user
from services.tournamentService import (
    get_all_tournaments,
    get_tournament_by_id,
    add_tournament,
    update_tournament_by_id,
    delete_tournament_by_id,
)

from typing import Annotated

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"],
    responses={404: NotFoundModel().model_dump()},
    dependencies=[Depends(get_current_user)],
)

"""
  Couldn't really find a way of getting the route dependency into every
  path operation function, so there's a little bit of code duplication
  here.
  https://github.com/tiangolo/fastapi/discussions/8810
"""
CurrentUser = Annotated[UserModel, Depends(get_current_user)]

# Changing pagination params default values
CustomPage = CustomizedPage[
    Page,
    UseParamsFields(size=10),
]


@router.get("/")
async def get_tournaments() -> CustomPage[TournamentResponseModel]:
    """
    Retrieves all tournaments.

    Returns:
        CustomPage[TournamentResponseModel]: All tournaments in a paginated fashion.
    """
    logger.info("Retrieving all tournaments")
    tournaments = await get_all_tournaments()
    return tournaments


@router.get("/{id}")
async def get_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of tournament to get")]
) -> TournamentResponseModel:
    """
    Retrieves the tournament having the provided ID.

    Args:
        id (PydanticObjectId, Path param): The ID of the tournament to be retrieved.

    Raises:
        TournamentNotFoundHTTPException: Status code 404. "Could not find tournament"

    Returns:
        TournamentResponseModel: The required tournament.
    """
    try:
        logger.info(f"Fetching tournament with ID: {id}")
        retrieved_tournament = await get_tournament_by_id(id)
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    return TournamentResponseModel(
        tournament_id=retrieved_tournament.id, **retrieved_tournament.model_dump()
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_tournament(
    tournament: TournamentModel, current_user: CurrentUser
) -> TournamentCreatedModel:
    """
    Creates a new tournament associated with the current user.

    Args:
        tournament (TournamentModel): The details of the tournament to be created.
        current_user (CurrentUser): The current user.

    Returns:
        TournamentCreatedModel: The ID of the created tournament.
    """
    logger.info(
        f"Creating tournament with details:\n{tournament}\nBy user: {current_user.uid}"
    )
    response = await add_tournament(tournament, current_user)
    return TournamentCreatedModel(tournament_id=response.id)


@router.put("/{id}")
async def update_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of tournament to update")],
    updated_tournament: TournamentModel,
    current_user: CurrentUser,
) -> TournamentResponseModel:
    """
    Updates the details of the tournament having the provided ID.

    Args:
        updated_tournament (TournamentModel): The new details of the tournament.
        current_user (CurrentUser): The current user.
        id (PydanticObjectId, Path param): The ID of the tournament whose details are to be updated.

    Raises:
        TournamentNotFoundHTTPException: Status code 404. "Could not find tournament"
        TournamentForbiddenHTTPException: Status code 403. "The tournament is not associated with your account"

    Returns:
        TournamentResponseModel: The updated tournament.
    """
    try:
        logger.info(
            f"Updating tournament with ID: {id}, by user: {current_user.uid}\nUpdated tournament details:\n{updated_tournament}"
        )
        response = await update_tournament_by_id(id, updated_tournament, current_user)
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    except TournamentForbiddenException:
        raise TournamentForbiddenHTTPException
    return TournamentResponseModel(tournament_id=response.id, **response.model_dump())


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of the tournament to delete")],
    current_user: CurrentUser,
) -> str:
    """
    Deletes the tournament having the provided ID.

    Args:
        current_user (CurrentUser): The current user.
        id (PydanticObjectId, Path param): The ID of the tournament to be deleted.

    Raises:
        TournamentNotFoundHTTPException: Status code 404. "Could not find tournament"
        TournamentForbiddenHTTPException: Status code 403. "The tournament is not associated with your account"

    Returns:
        str: Deletion confirmation message.
    """
    try:
        logger.info(f"Deleting tournament with ID: {id}, by user: {current_user.uid}")
        await delete_tournament_by_id(id, current_user)
        return "Tournament deleted successfully"
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    except TournamentForbiddenException:
        raise TournamentForbiddenHTTPException
