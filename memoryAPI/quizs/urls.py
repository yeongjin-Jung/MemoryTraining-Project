from django.urls import path
from . import views

app_name = 'quizs'

urlpatterns = [
    path('<int:pk>/', views.QuizView.as_view(), name='quiz'),
]
