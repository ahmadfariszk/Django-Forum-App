from ninja import NinjaAPI
from .models import Comment
from typing import List  
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from posts.models import Post
from django.contrib.auth.models import User
from ninja.pagination import paginate

api = NinjaAPI(urls_namespace="comments_api")

# Create a comment
@api.post("/comments", response=CommentSerializer)
def create_comment(request, data: CommentSerializer):
    post = get_object_or_404(Post, id=data.post)
    user = get_object_or_404(User, id=data.user)
    comment = Comment.objects.create(user=user, post=post, content=data.content)
    return comment

# Get a list of comments
@api.get("/comments", response=List[CommentSerializer])
@paginate()
def get_comments(request):
    comments = Comment.objects.all()
    return comments

# Get a single comment
@api.get("/comments/{comment_id}", response=CommentSerializer)
def get_comment(request, comment_id: int):
    comment = get_object_or_404(Comment, id=comment_id)
    return comment

# Update a comment
@api.put("/comments/{comment_id}", response=CommentSerializer)
def update_comment(request, comment_id: int, data: CommentSerializer):
    comment = get_object_or_404(Comment, id=comment_id)
    if comment.user != request.user:
        return 403, {"message": "You do not have permission to update this comment."}
    comment.content = data.content
    comment.save()
    return comment

# Delete a comment
@api.delete("/comments/{comment_id}", response={200: str, 404: str})
def delete_comment(request, comment_id: int):
    try:
        comment = get_object_or_404(Comment, id=comment_id)
        if comment.user != request.user:
            return 403, {"message": "You do not have permission to delete this comment."}
        comment.delete()
        return 200, {"message": "Comment deleted successfully"}
    except Comment.DoesNotExist:
        return 404, {"message": "Comment not found"}