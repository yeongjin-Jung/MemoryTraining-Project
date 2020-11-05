from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    path('create/', views.BookView.as_view(), name='create'),
    path('search/', views.BookListView.as_view(), name='search'),
    path('<int:pk>/', views.BookView.as_view(), name='detail'),
    path('bookmark/',views.BookmarkView.as_view(), name='bookmark'),
    path('myset/', views.MyBookView.as_view(), name='myset'),
    path('scrap/', views.ScrapView.as_view(), name='scrap'),
]
