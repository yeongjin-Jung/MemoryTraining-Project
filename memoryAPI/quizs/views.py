from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book, Card
from .serializers import QuizSerializer

# Create your views here.

class QuizView(APIView):
    permission_calsses = [IsAuthenticated]

    def get(self, request, pk, format=None):
        cards = Card.objects.filter(book_id=pk)
        serializer = QuizSerializer(cards, many=True)
        return Response(serializer.data)

