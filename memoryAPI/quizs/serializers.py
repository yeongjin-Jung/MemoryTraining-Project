from rest_framework import serializers
from .models import Book, Card, MyBook, Bookmark
from accounts.serializers import UserSerializer
 
class QuizSerializer(serializers.ModelSerializer):
    # book_id = serializers.IntegerField(required=False)
    # class Meta:
    #     model = Card
    #     fields = ['id', 'word', 'meaning', 'book_id']
