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

from models.user import UserModel
from models.tournament import Tournament_response, TournamentModel
from models.notFound import NotFoundModel

from services.authentication import get_current_user
from services.tournamentService import (
    get_tourneys,
    get_tournament_events_by_id,
    update_tournament_by_id,
    get_tourney_id,
    create_tournament_db,
    delete_tourney_id,
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


@router.get("/")
async def get_tournaments() -> list[TournamentModel]:
    logger.info("Retrieving all tournaments")
    tournaments = await get_tournaments()
    return tournaments


@router.get("/{id}/events")
async def get_events_by_id(id: PydanticObjectId):
    try:
        logger.info(f"Fetching events of tournament with ID: {id}")
        events = await get_tournament_events_by_id(id)
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    return events


@router.get("/{id}")
async def get_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of tournament to get")]
) -> TournamentModel:
    try:
        logger.info(f"Fetching tournament with ID: {id}")
        retrieved_tournament = await get_tourney_id(id)
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    return retrieved_tournament


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_tournament(
    tournament: TournamentModel, current_user: CurrentUser
) -> Tournament_response:
    logger.info(
        f"Creating tournament with details:\n{tournament}\nBy user: {current_user.uid}"
    )
    response = await create_tournament_db(tournament, current_user)
    return Tournament_response(tournament_id=response.id)


@router.put("/{id}")
async def update_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of tournament to update")],
    updated_tournament: TournamentModel,
    current_user: CurrentUser,
) -> TournamentModel:
    try:
        logger.info(
            f"Updating tournament with ID: {id}, by user: {current_user.uid}\nUpdated event details:\n{updated_tournament}"
        )
        response = await update_tournament_by_id(id, updated_tournament, current_user)
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    except TournamentForbiddenException:
        raise TournamentForbiddenHTTPException
    return response


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of the tournament to delete")],
    current_user: CurrentUser,
) -> str:
    try:
        logger.info(f"Deleting tournament with ID: {id}, by user: {current_user.uid}")
        await delete_tourney_id(id, current_user)
        return "Tournament deleted successfully"
    except TournamentNotFoundException:
        raise TournamentNotFoundHTTPException
    except TournamentForbiddenException:
        raise TournamentForbiddenHTTPException
