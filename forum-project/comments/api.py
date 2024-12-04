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
from typing import Dict

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
@api.get("/getall", response=List[CommentSerializer])
@paginate()
def get_comments(request):
    comments = Comment.objects\
        .select_related('user')
    serialized_comments = []
    for comment in comments:
        comment_data = CommentSerializer.from_orm(comment).dict()
        comment_data['username'] = comment.user.username 
        # print(comment_data) 
        serialized_comments.append(comment_data)
    return serialized_comments 

# Get a single comment
@api.get("/get/{comment_id}", response=CommentSerializer)
def get_comment(request, comment_id: int):
    comment = get_object_or_404(Comment, id=comment_id)
    return comment

# Get number of comments for a post ID
@api.get("/getnumber/{post_id}", response={200: int})
def get_comments(request, post_id: int):
    comments_count = Comment.objects.filter(post_id=post_id).count()
    return 200, comments_count

# Update a comment
@api.put("/update/{comment_id}", response=CommentSerializer, auth=JWTAuth())
def update_comment(request, comment_id: int, data: CommentSerializer):
    user: User = request.user
    if not user.is_authenticated:
        return JsonResponse({'detail': 'User is not logged in'}, status=401)
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'detail': 'Post not found'}, status=404)
    
    # Update the coemmnt fields
    comment.text = data.text
    comment.save()
    comment_dict = {
        "id": comment.id,
        "text": comment.text,
        "post_id": comment.post_id,
    }
    serialized_post = CommentSerializer(**comment_dict)
    return serialized_post.dict()

# Delete a comment
@api.delete("/delete/{comment_id}", response={200: Dict[str, str], 404: Dict[str, str], 403: Dict[str, str]}, auth=JWTAuth())
def delete_comment(request, comment_id: int):
    user: User = request.user
    try:
        comment = get_object_or_404(Comment, id=comment_id)
        if comment.user != request.user:
            return 403, {"message": "You do not have permission to delete this comment."}
        comment.delete()
        return 200, {"message": "Comment deleted successfully"}
    except Comment.DoesNotExist:
        return 404, {"message": "Comment not found"}