from ninja import Schema
from typing import Optional

class UserSerializer(Schema):
    id: Optional[int] = None
    username: str
    email: str
    name: Optional[str] = ''
    password: str  # This will be hashed later
