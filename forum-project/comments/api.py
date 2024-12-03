from ninja import Router
from .models import Comment
from typing import List  
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from posts.models import Post
from django.contrib.auth.models import User

router = Router()

@router.post("/comments", response=CommentSerializer)
def create_comment(request, data: CommentSerializer):
    post = get_object_or_404(Post, id=data.post)
    user = get_object_or_404(User, id=data.user)
    comment = Comment.objects.create(user=user, post=post, content=data.content)
    return comment

@router.get("/comments", response=List[CommentSerializer])
def get_comments(request):
    comments = Comment.objects.all()
    return comments

@router.get("/comments/{comment_id}", response=CommentSerializer)
def get_comment(request, comment_id: int):
    comment = get_object_or_404(Comment, id=comment_id)
    return comment

@router.put("/comments/{comment_id}", response=CommentSerializer)
def update_comment(request, comment_id: int, data: CommentSerializer):
    comment = get_object_or_404(Comment, id=comment_id)
    comment.content = data.content
    comment.save()
    return comment

@router.delete("/comments/{comment_id}", response={200: str, 404: str})
def delete_comment(request, comment_id: int):
    try:
        comment = get_object_or_404(Comment, id=comment_id)
        comment.delete()
        return 200, {"message": "Comment deleted successfully"}
    except Comment.DoesNotExist:
        return 404, {"message": "Comment not found"}