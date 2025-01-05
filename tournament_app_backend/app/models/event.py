from enum import Enum
from pydantic import BaseModel, Field
from beanie.odm.fields import PydanticObjectId


class EventMode(str, Enum):
    KNOCKOUT = "KNOCKOUT"
    LEAGUE = "LEAGUE"


class EventModel(BaseModel):
    event_name: str = Field(title="Name of the event")
    tournament_id: str = Field(title="Tournament that the event is linked to")
    num_of_seedings: int | None = Field(
        default=4, title="Number of seedings/ rankings to be given in this event"
    )
    max_entries: int = Field(ge=0, title="Maximum number of entries in this event")
    is_masters: bool | None = Field(
        default=False,
        title="Boolean flag indicating is the event is a Masters age category event",
    )
    age_restriction: int | None = Field(
        default=None,
        ge=0,
        title="Maximum age of a player in the event. Calculation logic is based on `is_masters` flag",
    )
    description: str = Field(title="Description of the event")
    entry_fee: int | None = Field(default=0, ge=0, title="Entry fee for the event")
    event_mode: EventMode = Field(
        title="Defines the mode of the event. Can be one of ['KNOCKOUT', 'LEAGUE']"
    )


class EventCreatedModel(BaseModel):
    event_id: PydanticObjectId


class EventResponseModel(EventModel):
    event_id: PydanticObjectId
