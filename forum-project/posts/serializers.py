from ninja import Schema

class PostSerializer(Schema):
    id: int
    title: str
    content: str
    image_url: str  # For the image link
    created_at: str  # Date format as string
    updated_at: str  # Date format as string