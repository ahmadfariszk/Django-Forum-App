from django.contrib.auth.models import AbstractUser #default python user class
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    
    # Use the email for authentication instead of the username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']
    
    def __str__(self):
        return self.email