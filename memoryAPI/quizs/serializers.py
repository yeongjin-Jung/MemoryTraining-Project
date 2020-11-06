from rest_framework import serializers
from books.models import Book, Card, MyBook, Bookmark
from accounts.serializers import UserSerializer
 
class QuizSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    question = serializers.CharField(max_length=300)
    answer_a = serializers.CharField(max_length=300)
    answer_b = serializers.CharField(max_length=300)
    answer_c = serializers.CharField(max_length=300)
    answer_d = serializers.CharField(max_length=300)
    correct_answer = serializers.CharField(max_length=100)
    # class Meta:
    #     model = Card
    #     fields = ['id', 'word', 'meaning', 'book_id']
