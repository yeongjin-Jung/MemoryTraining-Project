# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer
from rest_framework import generics
from .models import Book, Card
from rest_framework import filters

class BookView(APIView):
    permission_calsses = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=self.request.user)
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
            print(user_id)
            return Book.objects.exclude(user_id=user_id).filter(title__icontains=keyword).order_by('-updated_at')
        if self.request.query_params.get('my_set_only'):
            return Book.objects.filter(title__icontains=keyword, user_id=user_id).order_by('-updated_at')
        return Book.objects.filter(title__icontains=keyword).order_by('-updated_at')

# class CardListView(APIView):
#     permission_calsses = [IsAuthenticated]

#     def get(self, request, pk, format=None):
#         cards = Card.objects.filter(book_id=pk)
#         cardSerializer = CardSerializer(cards, many=True)
#         book = Book.objects.filter(pk=pk)
#         bookSerializer = BookSerializer(book)
#         print(bookSerializer)
#         return Response()