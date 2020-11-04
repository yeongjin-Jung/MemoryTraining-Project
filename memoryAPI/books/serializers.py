from rest_framework import serializers
from .models import Book, Card
from accounts.serializers import UserSerializer
 
class CardSerializer(serializers.ModelSerializer):
    book_id = serializers.IntegerField(required=False)
    class Meta:
        model = Card
        fields = ['id', 'word', 'meaning', 'book_id']

class BookSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        cards_data = validated_data.pop('cards')
        book = Book.objects.create(**validated_data)
        for card_data in cards_data:
            card_data['book'] = book
            print(card_data)
            Card.objects.create(**card_data)
        return book
        