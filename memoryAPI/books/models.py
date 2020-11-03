from django.db import models
from accounts.models import User

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_book')
    title = models.CharField(max_length=20, blank=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Card(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_card')
    word = models.TextField()
    meaning = models.TextField()

class MyBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_my_book')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_my_book')
    write_flag = models.BooleanField()

class Bookmark(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_bookmark')
    my_book = models.ForeignKey(MyBook, on_delete=models.CASCADE, related_name='my_book_bookmark')
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='card_bookmark')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_bookmark')
    bookmark_flag = models.BooleanField(default=False)