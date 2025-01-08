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
    """
    Retrieves all events in a paginated fashion.

    Returns:
        _type_: _description_
    """
    events = await paginate(
        query=EventDBModel.find_all(),
        transformer=lambda event_list: [
            EventResponseModel(event_id=event.id, **event.model_dump())
            for event in event_list
        ],
    )
    logger.info(f"Retrieved {len(events.items)} events")
    return events


async def get_event_by_id(event_id: PydanticObjectId):
    """
    Retrieves the event having the provided ID.

    Args:
        event_id (PydanticObjectId): The ID of the event to be retrieved.

    Raises:
        EventNotFoundException: If an event with the provided ID does not exist.

    Returns:
        _type_: _description_
    """
    retrieved_event: EventDBModel = await EventDBModel.get(event_id)
    if retrieved_event is None:
        logger.warning(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    return retrieved_event


async def get_events_by_tournament(tournament_id: str):
    """
    Retrieves all events associated with the tournament having the provided ID, in a paginated fashion.

    Args:
        tournament_id (str): The ID of the tournament whose events are to be retrieved.

    Returns:
        _type_: _description_
    """
    events = await paginate(
        query=EventDBModel.find_many(EventDBModel.tournament_id == tournament_id),
        transformer=lambda event_list: [
            EventResponseModel(event_id=event.id, **event.model_dump())
            for event in event_list
        ],
    )
    logger.info(f"Retrieved {len(events.items)} events")
    return events


async def add_event(new_event: EventModel, current_user: UserModel):
    """
    Creates a new event associated with the current user.

    Args:
        new_event (EventModel): The details of the event to be created.
        current_user (UserModel): The current user.

    Returns:
        _type_: _description_
    """
    converted_db_event: EventDBModel = EventDBModel(
        created_by=current_user.uid, **new_event.model_dump()
    )
    return await converted_db_event.insert()


async def update_event_by_id(
    event_id: PydanticObjectId, changed_event: EventModel, current_user: UserModel
):
    """
    Updates the details of the event having the provided ID.

    Args:
        event_id (PydanticObjectId): The ID of the event whose details are to be updated.
        changed_event (EventModel): The new details of the event.
        current_user (UserModel): The current user.

    Raises:
        EventNotFoundException: If an event with the provided ID does not exist.
        EventForbiddenException: If the current user is not authorized to update the event with the provided ID.

    Returns:
        _type_: _description_
    """
    current_event: EventDBModel = await get_event_by_id(event_id)
    if current_event is None:
        logger.warning(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    if current_event.created_by != current_user.uid:
        logger.warning(
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
    """
    Deletes the event having the provided ID.

    Args:
        event_id (PydanticObjectId): The ID of the event to be deleted.
        current_user (UserModel): The current user.

    Raises:
        EventNotFoundException: If an event with the provided ID does not exist.
        EventForbiddenException: If the current user is not authorized to delete the event with the provided ID.
    """
    event_to_delete: EventDBModel = await get_event_by_id(event_id)
    if event_to_delete is None:
        logger.warning(f"Query for event ID {event_id} returned None")
        raise EventNotFoundException
    if event_to_delete.created_by != current_user.uid:
        logger.warning(
            f"User {current_user.uid} not authorized to modify event {event_id}"
        )
        raise EventForbiddenException
    await event_to_delete.delete()
