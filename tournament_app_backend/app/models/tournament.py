from enum import Enum
from pydantic import BaseModel, Field
from beanie.odm.fields import PydanticObjectId
from datetime import date


class TournamentModel(BaseModel):
    tournament_name: str = Field(title="Name of the tournament")
    description: str = Field(title="Description of the tournament")
    is_public: bool | None = Field(
        default=False, title="Specifies if the tournament is public or private"
    )
    start_date: date = Field(title="Start date of the tournament")
    end_date: date = Field(title="End date of the tournament")
    location: str = Field(title="Venue of the tournament")
    events: list[PydanticObjectId] = Field(title="Events of the tournament")


class TournamentCreatedModel(BaseModel):
    tournament_id: PydanticObjectId


class TournamentResponseModel(TournamentModel):
    tournament_id: PydanticObjectId
