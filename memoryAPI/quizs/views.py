from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book, Card
from rest_framework import status
import random

# Create your views here.

class QuizView(APIView):
    permission_calsses = [IsAuthenticated]

    def get(self, request, pk, format=None):
        cards = Card.objects.filter(book_id=pk)

        if cards.count() < 4:
            return Response('객관식 문제 풀기는 한 세트에 4개 이상의 카드가 있어야 가능합니다.', status=status.HTTP_400_BAD_REQUEST)
        
        quiz = {}
        for card in cards:
            quiz[card.meaning] = card.word
        
        # quiz.keys()  # 키 값들 모음
        # type(  list(quiz.keys())  ) => list, type(  quiz.keys()  ) => dict_kyes 객체(순회만가능, CRUD 불가) dict_values, dict_items 동일
        # quiz.items()  # 키 밸류 쌍 [('key', 'value')], 
        # quiz.get('key')  # 'value'
        # 'key' in quiz  # T, F
        quizbox = []
        for k, val in enumerate(list(quiz.items())):
            Q = val[0]
            A = val[1]
            answers = random.sample(list(quiz.values()), 4)  # 4개 랜덤뽑기
            # print('index:',k+1, '문제:',Q, '답:',A, '번호:',answers)
            if A not in answers:
                answers.pop()
                answers.append(A)
                random.shuffle(answers)  # 순서 랜덤바꾸기
            # quizbox.append({'question':Q, 'answer':A, 'choice':answers})
            quizbox.append({'question':Q, 'a':answers[0], 'b':answers[1], 'c':answers[2], 'd':answers[3], 'answer':A})

        random.shuffle(quizbox)

        for i, q in enumerate(quizbox):
            q['no'] = i+1

        return Response(quizbox)
