from ninja import NinjaAPI
from .models import Post
from django.contrib.auth.models import User
from .serializers import PostSerializer
from typing import List
from ninja.pagination import paginate
from ninja_jwt.authentication import JWTAuth
from django.http import JsonResponse
from typing import Dict
from django.db.models import Count

api = NinjaAPI(urls_namespace="posts_api")

# Create a post
@api.post("/create", response=PostSerializer, auth=JWTAuth())
def create_post(request, data: PostSerializer):
    # Get the currently logged-in user
    user: User = request.user
    print(user, request.user.id, user.is_authenticated)

    # Ensure the user is authenticated
    if user.is_authenticated:
        # Create the post and automatically associate it with the logged-in user
        post = Post.objects.create(
            title=data.title,
            caption=data.caption,
            image_url=data.image_url,  # Optional field
            user_id=user.id  # Link the post to the actual authenticated user
        )
        return post
    else:
        # Return an error if the user is not authenticated
        return JsonResponse({'detail': 'User is not logged in'}, status=401)


# Get a list of posts
@api.get("/getall", response=List[PostSerializer])
# @paginate()
def get_posts(request):
    posts = Post.objects.annotate(comment_count=Count('comments'))\
        .select_related('user')
    # Manually add username/datetimes to the serialized data
    serialized_posts = []
    for post in posts:
        post_data = PostSerializer.from_orm(post).dict()
        post_data['username'] = post.user.username 
        # attempt at fixing the datetime response, still not working
        # post_data['created_at'] = post.created_at.isoformat() if post.created_at else None
        # post_data['updated_at'] = post.updated_at.isoformat() if post.updated_at else None
        # print(post_data) 
        serialized_posts.append(post_data)
    return serialized_posts

# Get a single post
@api.get("/get/{post_id}", response=PostSerializer)
def get_post(request, post_id: int):
    post = Post.objects.annotate(comment_count=Count('comments')) \
                       .select_related('user') \
                       .get(id=post_id)
    post_data = PostSerializer.from_orm(post).dict()
    post_data['username'] = post.user.username
    return post_data

# update a post
@api.put("/update/{post_id}", response=PostSerializer, auth=JWTAuth())
def update_post(request, post_id: int, data: PostSerializer):
    user: User = request.user

    if not user.is_authenticated:
        return JsonResponse({'detail': 'User is not logged in'}, status=401)

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'detail': 'Post not found'}, status=404)

    # Update the post fields
    post.title = data.title
    post.caption = data.caption
    if hasattr(data, 'image_url') and data.image_url:
        post.image_url = data.image_url
    post.save()

    # Serialize and return the updated post
    post_dict = {
        "id": post.id,
        "title": post.title,
        "caption": post.caption,
        "image_url": post.image_url,
    }

    # Use the Pydantic model to validate/serialize the data
    serialized_post = PostSerializer(**post_dict)
    return serialized_post.dict()

# delete a post
@api.delete("/delete/{post_id}", response={200: Dict[str, str], 404: Dict[str, str], 403: Dict[str, str]}, auth=JWTAuth())
def delete_post(request, post_id: int):
    user: User = request.user
    try:
        post = Post.objects.get(id=post_id)
        if post.user != request.user:
            return 403, {"message": "You do not have permission to delete this post."}
        post.delete()
        return 200, {"message": "Post deleted successfully"}
    except Post.DoesNotExist:
        return 404, {"message": "Post not found"}