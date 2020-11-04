# from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer
from .serializers import BookSerializer, CardSerializer
from rest_framework import generics
from .models import Book

class BookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=self.request.user)
        return Response(serializer.data)

class BookList(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        keyword = self.kwargs['keyword']
        return Book.objects.filter(title__icontains=keyword).order_by('-updated_at')