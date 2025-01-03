from django.db import models
from django.conf import settings  # Recommended for referencing the custom user model

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200)  # Title field with a maximum length of 200 characters
    image_url = models.URLField(max_length=500)  # Store image URL as a string
    caption = models.TextField(blank=True)  # Caption is optional
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s post titled '{self.title}' at {self.created_at}"