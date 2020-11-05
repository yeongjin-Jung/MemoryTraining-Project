# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer, MyBookSerializer, BookmarkSerializer
from rest_framework import generics, status
from .models import Book, Card, MyBook
from rest_framework import filters
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.http import Http404

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

class BookListView(APIView):
    serializer_class = BookSerializer
    permission_calsses = [IsAuthenticated]


    def get(self, request, format=None):
        user_id = self.request.user.pk
        keyword = self.request.query_params.get('keyword')
        if self.request.query_params.get('scrap_only'):
            return Book.objects.exclude(user_id=user_id).filter(title__icontains=keyword).order_by('-updated_at')
        if self.request.query_params.get('my_set_only'):
            return Book.objects.filter(title__icontains=keyword, user_id=user_id).order_by('-updated_at')
        books = Book.objects.exclude(user_id=user_id).filter(title__icontains=keyword).order_by('-updated_at')
        for book_info in books:
            print(book_info.id)
            if MyBook.objects.filter(book_id=book_info.id, user_id=user_id).exists():
                setattr(book_info, "scrap_flag", 1)
                # book_info['scrap_flag'] = 1
            else:
                setattr(book_info, "scrap_flag", 0)
                # book_info['scrap_flag'] = 1
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

class MyBookView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_calsses = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.pk
        print(user_id)
        my_books = MyBook.objects.filter(user=user_id).values_list('book', flat=True)
        print(my_books)
        return Book.objects.filter(id__in=my_books).order_by('-id')

class BookmarkView(APIView):
    serializer_class = BookmarkSerializer
    permission_calsses = [IsAuthenticated]

    def post(self, request, format=None):
        card = Card.objects.get(id=request.data['card_id'])
        cardSerializer = CardSerializer(card)
        book = Book.objects.get(id=request.data['book_id'])
        bookSerializer = BookSerializer(book)
        serializer = BookmarkSerializer(cardSerializer, bookSerializer)
        print(serializer)
        if(serializer.is_valid()):
            serializer.save(user=self.request.user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ScrapView(APIView):
    serializer_class = MyBookSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        my_book_dict = {'book':request.data['book_id'], 'user':self.request.user.pk}
        my_book_serializer = MyBookSerializer(data=my_book_dict)
        if my_book_serializer.is_valid(raise_exception=True):
            my_book_serializer.save(write_flag=0)
        return Response(my_book_serializer.data)

    def delete(self, request, format=None):
        my_book = MyBook.objects.get_object_or_404(book=request.data['book_id'], user=self.request.user.pk)
        my_book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)