from typing import Any, Dict
from typing_extensions import Annotated, Doc
from fastapi import status, HTTPException

class tournamentNotFoundException(HTTPException):
    def __init__(
            self,
            status_code: int = status.HTTP_404_NOT_FOUND,
            detail: Any = "Could not find tournament",
            headers: Dict[str, str] | None = {"WWW-Authenticate": "Bearer"}
    ) -> None:
        super().__init__(status_code, detail, headers)

class wrongUserTournametException(HTTPException):
    def __init__(
            self,
            status_code: int = status.HTTP_404_NOT_FOUND,
            detail: Any = "Invalid username",
            headers: Dict[str, str] | None = {"WWW-Authenticate": "Bearer"}
    ) -> None:
        super().__init__(status_code, detail, headers)

class tournamentDeleteForbiddenException(HTTPException):
    def __init__(
            self,
            status_code: int = status.HTTP_401_UNAUTHORIZED,
            detail: Any = "This user does not have permission to execute this function",
            headers: Dict[str, str] | None = {"WWW-Authenticate": "Bearer"}
    ) -> None:
        super().__init__(status_code, detail, headers)