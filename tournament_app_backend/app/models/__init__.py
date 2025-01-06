from .documentModels.events import EventDBModel
from .documentModels.tournaments import TournamentDBModel
from .documentModels.users import UserDBModel
from .documentModels.token import AccessTokenBDModel

__document_models__ = [EventDBModel, TournamentDBModel, UserDBModel, AccessTokenBDModel]
