"""
To fix: getting a CollectionsNotInitalized error whenever a request is sent from Swagger UI
Fixed
"""
from main import logger
from exceptions.tournamentExceptions import (
    tournamentNotFoundException,
    wrongUserTournametException,
    tournamentDeleteForbiddenException,
)
from fastapi_pagination.ext.beanie import paginate
from beanie.odm.fields import PydanticObjectId
from models.documentModels.tournaments import TournamentDBModel
from models.documentModels.events import EventDBModel
from models.tournament import TournamentModel,Tournament_response
from models.user import UserModel
from services.eventService import get_event_by_id




# service function for get_tournaments_by_id()
async def get_tourney_id(id: PydanticObjectId):
    tourney_retrieved: TournamentDBModel = await TournamentDBModel.get(id)
    if tourney_retrieved is None:
        logger.warn(f"No tournament exists for this id")
        raise tournamentNotFoundException
    logger.info(f"tournament of {id} was retrieved")
    return tourney_retrieved


# service function for create_tournament()
async def create_tournament_db(tournamnetObj: TournamentModel, currentUser: UserModel):
    tournament_database_model = TournamentDBModel(
        created_by=currentUser.username, **tournamnetObj.model_dump()
    )
    response = await tournament_database_model.insert()
    logger.info(f"Tournament of id {response.id} was created")
    return response


# service function for delete_tournament()
async def delete_tourney_id(tournament_id: PydanticObjectId, currentUser: UserModel):
    tourney_to_delete: TournamentDBModel = await get_tourney_id(tournament_id)
    if tourney_to_delete is None:
        logger.warn(f"No tournament was found for the id {tournament_id}")
        raise tournamentNotFoundException
    if tourney_to_delete.created_by != currentUser.username:
        logger.warn(f"Invalid user")
        raise tournamentDeleteForbiddenException
    logger.info(f"Tournament of id {tournament_id} has been deleted")
    response=await tourney_to_delete.delete()
    #return response


async def get_tourneys():
    tournaments= TournamentDBModel.find_all()
    tournament_list=await tournaments.to_list()
    logger.info(f"All tournaments were retrieved")
    return tournament_list


async def get_tournament_events_by_id(tournament_id: PydanticObjectId):
    tournaments: TournamentDBModel = await TournamentDBModel.get(tournament_id)
    if tournaments is None:
        logger.warn(f"No tournament was found for the id {tournament_id}")
        raise tournamentNotFoundException
    events=[]
    for l in tournaments.events:
        retrieved_event: EventDBModel = await EventDBModel.get(l)
        logger.info(f"Events for tournament id {tournament_id} was returned")
        events.append(retrieved_event)
        #logger.info(f"{retrieved_event}")
    return events


async def update_tournament_by_id(
    tournament_id: PydanticObjectId,
    changed_tournament: TournamentDBModel,
    currentUser: UserModel,
):
    curtour: TournamentDBModel = await get_tourney_id(tournament_id)
    if curtour is None:
        logger.warn(f"No tournament was found for the id {tournament_id}")
        raise tournamentNotFoundException
    if curtour.created_by != currentUser.username:
        logger.warn(f"Invalid user")
        raise wrongUserTournametException
    newtour = TournamentDBModel(
        created_by=currentUser.username, **changed_tournament.model_dump()
    )
    logger.info(f"Tournament of id {tournament_id} was updated")
    return await curtour.update({"$set": newtour.model_dump(exclude=["id"])})
