from typing import Optional, Any

from pydantic import BaseModel


class NotFoundModel(BaseModel):
    code: int = 404
    name: str = "not_found"
    description: str = "Not found"
    details: Optional[Any] = None
