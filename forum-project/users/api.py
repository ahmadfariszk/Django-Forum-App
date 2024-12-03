from ninja import NinjaAPI
from .models import User  # Assuming you have a User model
from .serializers import UserSerializer  # Define this later
from django.shortcuts import get_object_or_404
from typing import List

api = NinjaAPI()

@api.get("/users", response=List[UserSerializer])
def list_users(request):
    return User.objects.all()

@api.get("/users/{user_id}", response=UserSerializer)
def get_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    return user

@api.post("/users", response=UserSerializer)
def create_user(request, payload: UserSerializer):
    user = User.objects.create(**payload.dict())
    return user

@api.put("/users/{user_id}", response=UserSerializer)
def update_user(request, user_id: int, payload: UserSerializer):
    user = get_object_or_404(User, id=user_id)
    for attr, value in payload.dict().items():
        setattr(user, attr, value)
    user.save()
    return user

@api.delete("/users/{user_id}")
def delete_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return {"success": True}