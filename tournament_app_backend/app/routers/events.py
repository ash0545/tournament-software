import logging

from beanie.odm.fields import PydanticObjectId

from exceptions.httpExceptions.eventExceptions import (
    EventNotFoundHTTPException,
    EventForbiddenHTTPException,
)
from exceptions.eventExceptions import EventNotFoundException, EventForbiddenException

from fastapi.routing import APIRouter
from fastapi import status, Depends, Path, Query

from fastapi_pagination import Page
from fastapi_pagination.customization import CustomizedPage, UseParamsFields

from models.event import EventModel, EventCreatedModel, EventResponseModel
from models.notFound import NotFoundModel
from models.user import UserModel

from services.authentication import get_current_user
from services.eventService import (
    add_event,
    delete_event_by_id,
    get_all_events,
    get_event_by_id,
    update_event_by_id,
    get_events_by_tournament,
)

from typing import Annotated

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/events",
    tags=["events"],
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
async def get_events(
    tournament_id: Annotated[str | None, Query] = None
) -> CustomPage[EventResponseModel]:
    if tournament_id:
        logger.info(f"Received query parameter, tournament ID: {tournament_id}")
        events = await get_events_by_tournament(tournament_id)
    else:
        logger.info("No query parameter received, retrieving all events")
        events = await get_all_events()
    return events


@router.get("/{id}")
async def get_event(
    id: Annotated[PydanticObjectId, Path(title="ID of event to get")]
) -> EventResponseModel:
    try:
        logger.info(f"Fetching event with ID: {id}")
        retrieved_event = await get_event_by_id(id)
    except EventNotFoundException:
        raise EventNotFoundHTTPException
    return EventResponseModel(
        event_id=retrieved_event.id, **retrieved_event.model_dump()
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_event(
    event: EventModel, current_user: CurrentUser
) -> EventCreatedModel:
    logger.info(f"Creating event with details:\n{event}\nBy user: {current_user.uid}")
    response = await add_event(event, current_user)
    return EventCreatedModel(event_id=response.id)


@router.put("/{id}")
async def update_event(
    id: Annotated[PydanticObjectId, Path(title="ID of event to update")],
    updated_event: EventModel,
    current_user: CurrentUser,
) -> EventResponseModel:
    try:
        logger.info(
            f"Updating event with ID: {id}, by user: {current_user.uid}\nUpdated event details:\n{updated_event}"
        )
        response = await update_event_by_id(id, updated_event, current_user)
    except EventNotFoundException:
        raise EventNotFoundHTTPException
    except EventForbiddenException:
        raise EventForbiddenHTTPException
    return EventResponseModel(event_id=response.id, **response.model_dump())


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_event(
    id: Annotated[PydanticObjectId, Path(title="ID of event to delete")],
    current_user: CurrentUser,
) -> str:
    try:
        logger.info(f"Deleting event with ID: {id}, by user: {current_user.uid}")
        await delete_event_by_id(id, current_user)
        return "Event deleted successfully"
    except EventNotFoundException:
        raise EventNotFoundHTTPException
    except EventForbiddenException:
        raise EventForbiddenHTTPException
