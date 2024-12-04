from ninja import NinjaAPI
from .models import Post
from .serializers import PostSerializer
from typing import List
from ninja.pagination import paginate

api = NinjaAPI(urls_namespace="posts_api")

# Create a post
@api.post("/posts", response=PostSerializer)
def create_post(request, data: PostSerializer):
    post = Post.objects.create(**data.dict())
    return post

# Get a list of posts
@api.get("/posts", response=List[PostSerializer])
@paginate()
def get_posts(request, page_size: int = 10):
    posts = Post.objects.all()
    return posts

# Get a single post
@api.get("/posts/{post_id}", response=PostSerializer)
def get_post(request, post_id: int):
    post = Post.objects.get(id=post_id)
    return post

# update a post
@api.put("/posts/{post_id}", response=PostSerializer)
def update_post(request, post_id: int, data: PostSerializer):
    post = Post.objects.get(id=post_id)
    for attr, value in data.dict().items():
        setattr(post, attr, value)
    post.save()
    return post

# delete a post
@api.delete("/posts/{post_id}", response={200: str, 404: str})
def delete_post(request, post_id: int):
    try:
        post = Post.objects.get(id=post_id)
        post.delete()
        return 200, {"message": "Post deleted successfully"}
    except Post.DoesNotExist:
        return 404, {"message": "Post not found"}