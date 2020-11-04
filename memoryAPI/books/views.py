# from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer
from rest_framework import generics
from .models import Book
from rest_framework import filters

class BookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=self.request.user)
        return Response(serializer.data)

class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        user_id = self.request.user.pk
        keyword = self.kwargs['keyword']
        if self.request.query_params.get('scrap_only'):
            print(user_id)
            return Book.objects.exclude(user_id=user_id).filter(title__icontains=keyword).order_by('-updated_at')
        if self.request.query_params.get('my_set_only'):
            return Book.objects.filter(title__icontains=keyword, user_id=user_id).order_by('-updated_at')
        return Book.objects.filter(title__icontains=keyword).order_by('-updated_at')