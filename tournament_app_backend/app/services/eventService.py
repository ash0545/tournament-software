import logging

from beanie.odm.fields import PydanticObjectId

from exceptions.eventExceptions import (
    EventNotFoundException,
    EventForbiddenException,
)

from fastapi_pagination.ext.beanie import paginate

from models.documentModels.events import EventDBModel
from models.event import EventModel, EventResponseModel
from models.user import UserModel

logging.basicConfig(
    level=logging.INFO,
    format="%(module)s %(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


async def get_all_events():
    events = await paginate(
        EventDBModel.find_all(),
        transformer=lambda event_list: [
            EventResponseModel(event_id=event.id, **event.model_dump())
            for event in event_list
        ],
    )
    logger.info(f"Retrieved {len(events.items)} events")
    return events


async def get_event_by_id(event_id: PydanticObjectId):
    retrieved_event: EventDBModel = await EventDBModel.get(event_id)
    if retrieved_event is None:
        logger.warn(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    return retrieved_event


async def get_events_by_tournament(tournament_id: str):
    events = await paginate(
        EventDBModel.find_many(EventDBModel.tournament_id == tournament_id),
        transformer=lambda event_list: [
            EventResponseModel(event_id=event.id, **event.model_dump())
            for event in event_list
        ],
    )
    logger.info(f"Retrieved {len(events.items)} events")
    return events


async def add_event(new_event: EventModel, current_user: UserModel):
    converted_db_event: EventDBModel = EventDBModel(
        created_by=current_user.uid, **new_event.model_dump()
    )
    return await converted_db_event.insert()


async def update_event_by_id(
    event_id: PydanticObjectId, changed_event: EventModel, current_user: UserModel
):
    current_event: EventDBModel = await get_event_by_id(event_id)
    if current_event is None:
        logger.warn(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    if current_event.created_by != current_user.uid:
        logger.warn(
            f"User {current_user.uid} not authorized to modify event {event_id}"
        )
        raise EventForbiddenException
    changed_event = EventDBModel(
        created_by=current_user.uid, **changed_event.model_dump()
    )
    return await current_event.update(
        {"$set": changed_event.model_dump(exclude=["id"])}
    )


async def delete_event_by_id(event_id: PydanticObjectId, current_user: UserModel):
    event_to_delete: EventDBModel = await get_event_by_id(event_id)
    if event_to_delete is None:
        logger.warn(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    if event_to_delete.created_by != current_user.uid:
        logger.warn(
            f"User {current_user.uid} not authorized to modify event {event_id}"
        )
        raise EventForbiddenException
    await event_to_delete.delete()
