from ninja import Schema

class CommentSerializer(Schema):
    id: int
    post_id: int  # ForeignKey to Post
    user_id: int  # ForeignKey to User
    content: str
    created_at: str  # Date format as string
    updated_at: str  # Date format as string