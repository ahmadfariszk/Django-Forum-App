from ninja import NinjaAPI
from .models import Post
from django.contrib.auth.models import User
from .serializers import PostSerializer
from typing import List
from ninja.pagination import paginate
from ninja_jwt.authentication import JWTAuth
from django.http import JsonResponse


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
@paginate()
def get_posts(request, page_size: int = 10):
    posts = Post.objects.all()
    return posts

# Get a single post
@api.get("/get/{post_id}", response=PostSerializer)
def get_post(request, post_id: int):
    post = Post.objects.get(id=post_id)
    return post

# update a post
@api.put("/update/{post_id}", response=PostSerializer)
def update_post(request, post_id: int, data: PostSerializer):
    post = Post.objects.get(id=post_id)
    if post.user != request.user:
        return 403, {"message": "You do not have permission to update this post."}
    for attr, value in data.dict().items():
        setattr(post, attr, value)
    post.save()
    return post

# delete a post
@api.delete("/delete/{post_id}", response={200: str, 404: str})
def delete_post(request, post_id: int):
    try:
        post = Post.objects.get(id=post_id)
        if post.user != request.user:
            return 403, {"message": "You do not have permission to delete this post."}
        post.delete()
        return 200, {"message": "Post deleted successfully"}
    except Post.DoesNotExist:
        return 404, {"message": "Post not found"}