from django.urls import path
from .views import UniversityListView, TopUniversityView, UniversityView

urlpatterns = [
    path('', UniversityListView.as_view()),
    path('topuniversity', TopUniversityView.as_view()),
    path('<pk>', UniversityView.as_view()),
]