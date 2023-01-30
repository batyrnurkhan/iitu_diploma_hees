from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import University
from .serializers import UniversitySerializer

class UniversityListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    pagination_class = None

class UniversityView(RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class TopUniversityView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = University.objects.filter(top_university=True)
    serializer_class = UniversitySerializer
    pagination_class = None