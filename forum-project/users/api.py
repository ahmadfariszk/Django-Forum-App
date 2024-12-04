from ninja import NinjaAPI
from .models import User  # Assuming you have a User model
from .serializers import UserSerializer  # Define this later
from django.shortcuts import get_object_or_404
from typing import List
from django.contrib.auth.hashers import make_password

api = NinjaAPI()

@api.get("/getall", response=List[UserSerializer])
def list_users(request):
    return User.objects.all()

@api.get("/get/{user_id}", response=UserSerializer)
def get_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    return user

@api.post("/create", response=UserSerializer)
def create_user(request, payload: UserSerializer):
    # Hash the password before saving the user
    hashed_password = make_password(payload.password)
    
    # Create the user with the hashed password
    user = User.objects.create(
        username=payload.username,
        email=payload.email,
        name=payload.name,
        password=hashed_password
    )
    
    return user

@api.put("/update/{user_id}", response=UserSerializer) # needs fixing, user.user is causing issues
def update_user(request, user_id: int, payload: UserSerializer):
    user = get_object_or_404(User, id=user_id)
    if user.user != request.user:
        return 403, {"message": "You do not have permission to update this user."}
    for attr, value in payload.dict().items():
        setattr(user, attr, value)
    user.save()
    return user

@api.delete("/delete/{user_id}") # needs fixing, user.user is causing issues
def delete_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    if user.user != request.user:
        return 403, {"message": "You do not have permission to delete this user."}
    user.delete()
    return {"success": True}