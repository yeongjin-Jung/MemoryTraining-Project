from django.urls import path
from . import views

app_name = 'quizs'

urlpatterns = [
    path('get/', views.QuizView.as_view(), name='get'),
]
