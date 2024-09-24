from django.urls import path
from .views import ProductsListCreate

urlpatterns = [
	path('products/',ProductsListCreate.as_view(), name='list_create'),
]