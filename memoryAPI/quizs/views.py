from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book, Card, Bookmark
from django.forms.models import model_to_dict
from rest_framework import status
import random

# Create your views here.

class QuizView(APIView):
    permission_calsses = [IsAuthenticated]

    def get(self, request, pk, format=None):
        book_id = pk
        user = self.request.user.pk
        if self.request.query_params.get('bookmark'):
            card_id_list = Bookmark.objects.filter(book=book_id, bookmark_flag=True, user=user).values_list('card', flat=True)
            # print(card_id_list)
            cards = Card.objects.filter(book_id=pk, id__in=card_id_list)
        else:
            cards = Card.objects.filter(book_id=pk)

        card_choices = Card.objects.filter(book_id=pk)

        if card_choices.count() < 4:
            return Response('객관식 문제 풀기는 한 세트에 4개 이상의 카드가 있어야 가능합니다.', status=status.HTTP_400_BAD_REQUEST)
        
        quiz = []
        quiz_choice = []
        for card in cards:
            card = model_to_dict(card)
            # print(card)
            if Bookmark.objects.filter(book=pk, card=card['id'], user=user, bookmark_flag=1).exists():
                card["bookmark_flag"] = 1
            else:
                card["bookmark_flag"] = 0
            quiz += [card]
        # print(quiz)

        for card in card_choices:
            quiz_choice += [card.word]
        
        # quiz.keys()  # 키 값들 모음
        # type(  list(quiz.keys())  ) => list, type(  quiz.keys()  ) => dict_kyes 객체(순회만가능, CRUD 불가) dict_values, dict_items 동일
        # quiz.items()  # 키 밸류 쌍 [('key', 'value')], 
        # quiz.get('key')  # 'value'
        # 'key' in quiz  # T, F
        quizbox = []
        for index, card in enumerate(quiz):
            Q = card['meaning']
            A = card['word']
            # print(quiz_choice)
            if len(quiz_choice) == 4:
                answers = random.shuffle(quiz_choice)
            else:
                answers = random.sample(quiz_choice, 4)  # 4개 랜덤뽑기
                # print('random', answers)
            # print('index:',k+1, '문제:',Q, '답:',A, '번호:',answers)
            if A not in answers:
                answers.pop()
                answers.append(A)
                random.shuffle(answers)  # 순서 랜덤바꾸기
            # quizbox.append({'question':Q, 'answer':A, 'choice':answers})
            alphabet = ''
            for i in range(len(answers)):
                if answers[i] == A:
                    alphabet = chr(97+i)
            quizbox.append({'card':card, 'question':Q, 'a':answers[0], 'b':answers[1], 'c':answers[2], 'd':answers[3], 'answer':alphabet})

        random.shuffle(quizbox)
        
        for i, q in enumerate(quizbox):
            q['no'] = i+1

        return Response(quizbox)
