import logging

from beanie.odm.fields import PydanticObjectId

from exceptions.tournamentExceptions import (
    TournamentNotFoundException,
    TournamentForbiddenException,
)

from fastapi_pagination.ext.beanie import paginate

from models.documentModels.tournaments import TournamentDBModel
from models.tournament import TournamentModel, TournamentResponseModel
from models.user import UserModel


logging.basicConfig(
    level=logging.INFO,
    format="%(module)s %(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


async def get_all_tournaments():
    tournaments = await paginate(
        query=TournamentDBModel.find_all(),
        transformer=lambda tournament_list: [
            TournamentResponseModel(
                tournament_id=tournament.id, **tournament.model_dump()
            )
            for tournament in tournament_list
        ],
    )
    logger.info(f"Retrieved {len(tournaments.items)} tournaments")
    return tournaments


async def get_tournament_by_id(tournament_id: PydanticObjectId):
    retrieved_tournament: TournamentDBModel = await TournamentDBModel.get(tournament_id)
    if retrieved_tournament is None:
        logger.warning(f"Query for tournament ID {tournament_id} returned None")
        raise TournamentNotFoundException
    return retrieved_tournament


async def add_tournament(new_tournament: TournamentModel, current_user: UserModel):
    converted_db_tournament: TournamentDBModel = TournamentDBModel(
        created_by=current_user.uid, **new_tournament.model_dump()
    )
    return await converted_db_tournament.insert()


async def update_tournament_by_id(
    tournament_id: PydanticObjectId,
    changed_tournament: TournamentModel,
    current_user: UserModel,
):
    current_tournament: TournamentDBModel = await get_tournament_by_id(tournament_id)
    if current_tournament is None:
        logger.warning(f"Query for tournament ID {tournament_id} returned None")
        raise TournamentNotFoundException
    if current_tournament.created_by != current_user.uid:
        logger.warning(
            f"User {current_user.uid} not authorized to modify event {tournament_id}"
        )
        raise TournamentForbiddenException
    changed_tournament = TournamentDBModel(
        created_by=current_user.uid, **changed_tournament.model_dump()
    )
    logger.info(f"Tournament of id {tournament_id} was updated")
    return await current_tournament.update(
        {"$set": changed_tournament.model_dump(exclude=["id"])}
    )


async def delete_tournament_by_id(
    tournament_id: PydanticObjectId, current_user: UserModel
):
    tournament_to_delete: TournamentDBModel = await get_tournament_by_id(tournament_id)
    if tournament_to_delete is None:
        logger.warning(f"Query for tournament ID {tournament_id} returned None")
        raise TournamentNotFoundException
    if tournament_to_delete.created_by != current_user.uid:
        logger.warning(
            f"User {current_user.uid} not authorized to modify event {tournament_id}"
        )
        raise TournamentForbiddenException
    await tournament_to_delete.delete()
