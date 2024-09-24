from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductsSerializer

class ProductsListCreate(generics.ListCreateAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductsSerializer

	def perform_create(self, serializer):
		if serializer.validated_data['price'] <= 0:
			raise serializers.ValidationError("цена должна быть положительным числом")
		serializer.save()