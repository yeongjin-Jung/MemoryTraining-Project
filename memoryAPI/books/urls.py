from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    path('create/', views.BookView.as_view(), name='create'),
    path('search/<str:keyword>/', views.BookListView.as_view(), name='search'),
    path('<int:pk>', views.BookDetail.as_View(), name='detail')
]
