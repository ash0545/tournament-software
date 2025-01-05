""" (Kaustub)
TO-DO:
1. Standaradize code (PEP-8 standards)
2. Add description and additional details to the API routes
3. Define exception classes more clearly (HTTPErrors must be handled in a subclass)
4. Test for unauthorized delete exceptions, 
"""

from beanie.odm.fields import PydanticObjectId

from exceptions.tournamentExceptions import tournamentNotFoundException, tournamentDeleteForbiddenException

from fastapi.routing import APIRouter
from fastapi import status, Depends, Path, Query

from models.user import UserModel
from models.tournament import Tournament_response, TournamentModel
from models.notFound import NotFoudModel

from services.authentication import get_current_user
from services.tournamentService import (
    get_tourneys,
    get_tournament_events_by_id,
    update_tournament_by_id,
    get_tourney_id,
    create_tournament_db,
    delete_tourney_id
)

from typing import Annotated

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"],
    responses={404: NotFoudModel().model_dump()},
    dependencies=[Depends(get_current_user)],
)

""" (Kaustub)
Similar to feature/event-routes, CurrentUser is defined so that code duplication is less
The user can only access these functions if they have a valid JWT token
CurrentUser is passed to all functions that require exclusivity of the user
"""
CurrentUser = Annotated[UserModel, Depends(get_current_user)]


@router.get("/")
async def get_tournaments()->list[TournamentModel]:
    tournament_list = await get_tourneys()
    return tournament_list


@router.get("/{id}/events")
async def get_events_by_id(id: PydanticObjectId):
    event_list=await get_tournament_events_by_id(id)
    return event_list


# TO-DO: Error testing (Kaustub)
@router.get("/{id}")
async def get_tournaments_by_id(
    id: Annotated[PydanticObjectId, Path(title="ID of the tournament to get")]
) -> TournamentModel:
    try:
        tourney_retrieved = await get_tourney_id(id)
    except tournamentNotFoundException:
        raise tournamentNotFoundException
    return tourney_retrieved


# TO-DO: Error testing (Kaustub)
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_tournament(
    tournamentObj: TournamentModel, current_user: CurrentUser
) -> Tournament_response:
    response = await create_tournament_db(tournamentObj, current_user)
    return Tournament_response(tournament_id=response.id)


@router.put("/{id}")
async def update_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of tournament")],
    updated_tournament: TournamentModel,
    current_user: CurrentUser,
) -> TournamentModel:
    response = await update_tournament_by_id(id, updated_tournament, current_user)
    if response is None:
        raise tournamentNotFoundException
    return response


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_tournament(
    id: Annotated[PydanticObjectId, Path(title="ID of the tournament to delete")],
    current_user: CurrentUser,
) -> (
    None
):  # returns nothing, can be changed to a message such as "Tournament deleted successfully"
    try:
        await delete_tourney_id(id, current_user)
    except tournamentNotFoundException:
        raise tournamentNotFoundException
    except tournamentDeleteForbiddenException:
        raise tournamentDeleteForbiddenException
