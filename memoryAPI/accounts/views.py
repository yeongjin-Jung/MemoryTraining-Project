from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer, ChangePasswordSerializer
from .models import User

from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated   

class AuthRegister(APIView):
    """
    Register a new user.
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    print(self.object,"//",serializer.data.get("old_password"), "//")
                    return Response({"status": "fail", "message":"wrong password"}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                return Response({"status": "success"}, status=status.HTTP_201_CREATED)

class IdDuplicateCheckView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"status":"fail", "message":"The email already exists"})
        return Response({"status":"success"})
