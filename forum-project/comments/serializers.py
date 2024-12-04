from ninja import Schema
from pydantic import Field
from typing import Optional
from datetime import datetime

class CommentSerializer(Schema):
    id: Optional[int] = None  # id is auto-generated by the database, so make it optional
    post_id: int  # ForeignKey to Post
    text: str
    created_at: Optional[str] = Field(None, alias="createdAt")  # Automatically set by the database, so optional
    updated_at: Optional[str] = Field(None, alias="updatedAt")  # Automatically set by the database, so optional

    class Config:
        # To make sure the date fields are returned as string formatted dates
        json_encoders = {
            str: lambda v: v.isoformat() if isinstance(v, datetime) else v
        }