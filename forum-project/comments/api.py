from ninja import NinjaAPI
from .models import Comment
from typing import List  
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from posts.models import Post
from django.contrib.auth.models import User
from ninja.pagination import paginate
from django.http import JsonResponse
from ninja_jwt.authentication import JWTAuth

api = NinjaAPI(urls_namespace="comments_api")

# Create a comment
@api.post("/create", response=CommentSerializer, auth=JWTAuth())
def create_comment(request, data: CommentSerializer):
    # Get the currently logged-in user
    user: User = request.user
    print(user, request.user.id, user.is_authenticated)
    if user.is_authenticated:
        comment = Comment.objects.create(
            post_id=data.post_id,
            user_id=user.id,
            text=data.text,
        )
        return comment
    else:
        # Return an error if the user is not authenticated
        return JsonResponse({'detail': 'User is not logged in'}, status=401)

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