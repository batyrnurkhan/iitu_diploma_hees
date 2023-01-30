from django.urls import path
from .views import MaterialsView, MaterialView, SearchView

urlpatterns = [
    path('', MaterialsView.as_view()),
    path('search', SearchView.as_view()),
    path('<slug>', MaterialView.as_view()),
]