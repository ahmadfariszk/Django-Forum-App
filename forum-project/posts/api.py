from ninja import Router
from .models import Post
from .serializers import PostSerializer
from typing import List

router = Router()

@router.post("/posts", response=PostSerializer)
def create_post(request, data: PostSerializer):
    post = Post.objects.create(**data.dict())
    return post

@router.get("/posts", response=List[PostSerializer])
def get_posts(request):
    posts = Post.objects.all()
    return posts

@router.get("/posts/{post_id}", response=PostSerializer)
def get_post(request, post_id: int):
    post = Post.objects.get(id=post_id)
    return post

@router.put("/posts/{post_id}", response=PostSerializer)
def update_post(request, post_id: int, data: PostSerializer):
    post = Post.objects.get(id=post_id)
    for attr, value in data.dict().items():
        setattr(post, attr, value)
    post.save()
    return post

@router.delete("/posts/{post_id}", response={200: str, 404: str})
def delete_post(request, post_id: int):
    try:
        post = Post.objects.get(id=post_id)
        post.delete()
        return 200, {"message": "Post deleted successfully"}
    except Post.DoesNotExist:
        return 404, {"message": "Post not found"}