from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book, Card

# Create your views here.

class QuizView(APIView):
    permission_calsses = [IsAuthenticated]

    # def get(self, request, pk, format=None):
    #     cards = Card.objects.filter(book_id=pk)
    #     cardSerializer = CardSerializer(cards, many=True)
    #     return Response(cardSerializer.data)

