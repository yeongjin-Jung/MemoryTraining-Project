from rest_framework import serializers
from books.models import Card #, Book, MyBook, Bookmark
# from accounts.serializers import UserSerializer
 
# class QuizSerializer(serializers.ModelSerializer):
#     # number = serializers.IntegerField(write_only=True)
#     fakewords = serializers.DictField(read_only=True)

#     class Meta:
#         model = Card
#         exclude  = ['book']

#     def create(self, validated_data):
#         ret = super().create(validated_data)
#         return ret