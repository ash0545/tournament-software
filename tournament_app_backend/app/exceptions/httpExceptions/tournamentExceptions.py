from typing import Dict
from fastapi import status, HTTPException


class TournamentNotFoundHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int = status.HTTP_404_NOT_FOUND,
        detail: str = "Could not find tournament",
        headers: Dict[str, str] | None = {"WWW-Authenticate": "Bearer"},
    ) -> None:
        super().__init__(status_code, detail, headers)


class TournamentForbiddenHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int = status.HTTP_403_FORBIDDEN,
        detail: str = "The tournament is not associated with your account",
        headers: Dict[str, str] | None = {"WWW-Authenticate": "Bearer"},
    ) -> None:
        super().__init__(status_code, detail, headers)
