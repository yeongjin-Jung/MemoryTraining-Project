# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer, MyBookSerializer
from rest_framework import generics
from .models import Book, Card, MyBook
from rest_framework import filters
from django.forms.models import model_to_dict

class BookView(APIView):
    permission_calsses = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            book = serializer.save(user=self.request.user)
            my_book_dict = {'book':book.id, 'write_flag':1, 'user':self.request.user.pk}
            my_book_serializer = MyBookSerializer(data=my_book_dict)
            if my_book_serializer.is_valid(raise_exception=True):
                my_book_serializer.save()
        return Response(serializer.data)

    def get(self, request, pk, format=None):
        cards = Card.objects.filter(book_id=pk)
        cardSerializer = CardSerializer(cards, many=True)
        return Response(cardSerializer.data)

class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_calsses = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.pk
        keyword = self.request.query_params.get('keyword')
        if self.request.query_params.get('scrap_only'):
            return Book.objects.exclude(user_id=user_id).filter(title__icontains=keyword).order_by('-updated_at')
        if self.request.query_params.get('my_set_only'):
            return Book.objects.filter(title__icontains=keyword, user_id=user_id).order_by('-updated_at')
        return Book.objects.filter(title__icontains=keyword).order_by('-updated_at')

class MyBookView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_calsses = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.pk
        print(user_id)
        my_books = MyBook.objects.filter(user=user_id).values_list('book', flat=True)
        print(my_books)
        return Book.objects.filter(id__in=my_books).order_by('-id')

# class BookmarkView(APIView):
#     permission_calsses = [IsAuthenticated]

#     def post(self, request, format=None):
#         serializer = BookmarkSerializer()

