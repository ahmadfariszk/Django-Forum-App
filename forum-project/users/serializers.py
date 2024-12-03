from ninja import Schema

class UserSerializer(Schema):
    id: int
    username: str
    email: str