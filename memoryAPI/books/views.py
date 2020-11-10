# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer, MyBookSerializer, BookmarkSerializer
from rest_framework import generics, status
from .models import Book, Card, MyBook, Bookmark
from rest_framework import filters
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import IntegerField, Case, Value, When
from random import shuffle
from django.db import models

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
        if self.request.query_params.get('bookmark'):
            card_id_list = Bookmark.objects.filter(book=pk, bookmark_flag=True).values_list('card', flat=True)
            cards = Card.objects.filter(book_id=pk, id__in=card_id_list)
        else:
            cards = Card.objects.filter(book_id=pk)
        user = self.request.user.pk
        for card in cards:
            if Bookmark.objects.filter(book=pk, card=card.id, user=user, bookmark_flag=1).exists():
                setattr(card, "bookmark_flag", 1)
            else:
                setattr(card, "bookmark_flag", 0)
        if self.request.query_params.get('random'):
            cards = list(cards)
            shuffle(cards)
        cardSerializer = CardSerializer(cards, many=True)
        return Response(cardSerializer.data)

    def delete(self, request, pk, format=None):
        book = Book.objects.get(id=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
        my_books = MyBook.objects.filter(user=user_id).order_by('-id').values_list('book', flat=True)
        print(my_books)
        # books = Book.objects.filter(id__in=my_books).order_by('-id').annotate(write_flag=Case(When(MyBook.objects.get(book=Book.pk, user_id=user_id).write_flag==1), then=Value(1)), default=Value(0), output_field=IntegerField())
        whens = []
        for sort_index, value in enumerate(my_books):
            whens.append(models.When(id=value, then=models.Value(sort_index)))

        books = Book.objects.filter(id__in=my_books).annotate(_sort_index=models.Case(*whens, output_field=models.IntegerField())).order_by('_sort_index')
        # books = Book.objects.filter(id__in=my_books)
        for book in books:
            if MyBook.objects.get(book=book.pk, user_id=user_id).write_flag==1:
                setattr(book, 'write_flag', 1)
            else:
                setattr(book, 'write_flag', 0)
        return books

class BookmarkView(APIView):
    serializer_class = BookmarkSerializer
    permission_calsses = [IsAuthenticated]

    def post(self, request, format=None):
        card_id = request.data['card_id']
        book_id = request.data['book_id']
        user_id = self.request.user.pk
        my_book_id = MyBook.objects.get(book_id=book_id, user_id=user_id).pk
        bookmark_dict = {'card':card_id, 'book':book_id, 'my_book':my_book_id, 'bookmark_flag':1}
        serializer = BookmarkSerializer(data=bookmark_dict)
        if Bookmark.objects.filter(card=card_id, book=book_id, my_book=my_book_id, bookmark_flag=1, user=user_id).exists():
            return Response('Already Bookmarked', status=status.HTTP_400_BAD_REQUEST)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        card_id = request.data['card_id']
        book_id = request.data['book_id']
        my_book_id = MyBook.objects.get(book_id=book_id, user_id=self.request.user.pk).pk
        bookmark = Bookmark.objects.get(card=card_id, book=book_id, my_book=my_book_id, bookmark_flag=1)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ScrapView(APIView):
    serializer_class = MyBookSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        my_book_dict = {'book':request.data['book_id'], 'user':self.request.user.pk}
        my_book_serializer = MyBookSerializer(data=my_book_dict)
        if my_book_serializer.is_valid(raise_exception=True):
            if not MyBook.objects.filter(book_id=request.data['book_id'], user_id=self.request.user.pk).exists():
                my_book_serializer.save(write_flag=0)
        return Response(my_book_serializer.data)

    def delete(self, request, format=None):
        my_book = MyBook.objects.get(book=request.data['book_id'], user=self.request.user.pk)
        my_book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CardView(APIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        book_id = request.data['book_id']
        if not Book.objects.filter(id=book_id, user_id=self.request.user.pk).exists():
            return Response('직접 생성한 세트만 추가가 가능합니다', status=status.HTTP_400_BAD_REQUEST)
        card_list = request.data['card_list']
        for card in card_list:
            card_dict = {'book_id':book_id, 'word':card['word'], 'meaning':card['meaning']}
            cardSerializer = CardSerializer(data=card_dict)
            if cardSerializer.is_valid(raise_exception=True):
                cardSerializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        card_id_list = request.data['card_id']
        for card_id in card_id_list:
            card = Card.objects.get(id=card_id)
            book_id = card.book.pk
            if not Book.objects.filter(id=book_id, user_id=self.request.user.pk).exists():
                return Response('직접 생성한 카드만 삭제가 가능합니다', status=status.HTTP_400_BAD_REQUEST)
            card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, format=None):
        card_list = request.data['card_list']
        for card in card_list:
            book_id = Card.objects.get(id=card['id']).book.pk
            if not Book.objects.filter(id=book_id, user_id=self.request.user.pk).exists():
                return Response('직접 생성한 카드만 수정이 가능합니다', status=status.HTTP_400_BAD_REQUEST)
            Card.objects.filter(id=card['id']).update(word=card['word'], meaning=card['meaning'])
        return Response(status=status.HTTP_204_NO_CONTENT)
