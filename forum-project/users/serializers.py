from ninja import Schema
from typing import Optional

class UserSerializer(Schema):
    id: Optional[int] = None
    username: str
    email: str
    password: str
    name: Optional[str] = ''
