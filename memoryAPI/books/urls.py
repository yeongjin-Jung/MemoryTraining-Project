from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    path('create/', views.BookView.as_view(), name='create'),
    path('search/', views.BookListView.as_view(), name='search'),
]
