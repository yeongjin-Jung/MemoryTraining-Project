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
            quiz_choice += [model_to_dict(card)]
        
        # quiz.keys()  # 키 값들 모음
        # type(  list(quiz.keys())  ) => list, type(  quiz.keys()  ) => dict_kyes 객체(순회만가능, CRUD 불가) dict_values, dict_items 동일
        # quiz.items()  # 키 밸류 쌍 [('key', 'value')], 
        # quiz.get('key')  # 'value'
        # 'key' in quiz  # T, F
        quizbox = []
        for index, card in enumerate(quiz):
            Q = card['meaning']
            A = card['word']
            print(quiz_choice)
            if len(quiz_choice) == 4:
                random.shuffle(quiz_choice)
            else:
                quiz_choice = random.sample(quiz_choice, 4)  # 4개 랜덤뽑기
            # print('index:',k+1, '문제:',Q, '답:',A, '번호:',answers)
            answer_flag = False # quiz_choice에 answer이 이미 포함되어있으면 True, 아니면 False
            answer_list = []
            alphabet = ''
            alphabet_list = []
            for idx in range(len(quiz_choice)):
                if quiz_choice[idx]['meaning'] == Q or quiz_choice[idx]['word'] == A:
                    answer_flag = True
                    answer_list += [idx]
            if not answer_flag:
                quiz_choice.pop()
                quiz_choice.append(card)
                random.shuffle(quiz_choice)  # 순서 랜덤바꾸기
                for i in range(len(quiz_choice)):
                    if quiz_choice[i]['word'] == A:
                        alphabet = chr(97+i)
                        alphabet_list += [alphabet]
            else:
                for answer in answer_list:
                    alphabet = chr(97+answer)
                    alphabet_list += [alphabet]
            quizbox.append({'card':card, 'question':Q, 'a':quiz_choice[0]['word'], 'b':quiz_choice[1]['word'], 'c':quiz_choice[2]['word'], 'd':quiz_choice[3]['word'], 'answer':alphabet_list})

        random.shuffle(quizbox)
        
        for i, q in enumerate(quizbox):
            q['no'] = i+1

        return Response(quizbox)
