from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Material
from .serializers import MaterialSerializer, MaterialDetailSerializer
from datetime import datetime, timezone, timedelta
from django.views.decorators.csrf import csrf_exempt

class MaterialsView(ListAPIView):
    queryset = Material.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = MaterialSerializer
    lookup_field = 'slug'

class MaterialView(RetrieveAPIView):
    queryset = Material.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = MaterialDetailSerializer
    lookup_field = 'slug'


class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = MaterialSerializer

    
    def post(self, request, format=None):
        queryset = Material.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data

        material_type = data['material_type']
        queryset = queryset.filter(material_type__iexact=material_type)

        price = data['price']
        if price == '$0+':
            price = 0
        elif price == '$100,000+':
            price = 100000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1
        
        if price != -1:
            queryset = queryset.filter(price__gte=price)
        
        

        detail_type = data['detail_type']
        queryset = queryset.filter(detail_type__iexact=detail_type)

        aom = data['aom']
        if aom == '10+':
            aom = 10
        elif aom == '12+':
            aom = 12
        elif aom == '15+':
            aom = 15
        elif aom == '20+':
            aom = 20
        elif aom == 'Any':
            aom = 0
        
        if aom != 0:
            queryset = queryset.filter(aom__gte=aom)
        
        days_passed = data['days_listed']
        if days_passed == '1 or less':
            days_passed = 1
        elif days_passed == '2 or less':
            days_passed = 2
        elif days_passed == '5 or less':
            days_passed = 5
        elif days_passed == '10 or less':
            days_passed = 10
        elif days_passed == '20 or less':
            days_passed = 20
        elif days_passed == 'Any':
            days_passed = 0
        
        for query in queryset:
            num_days = (datetime.now(timezone.utc) - query.list_date).days

            if days_passed != 0:
                if num_days > days_passed:
                    slug=query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
        
        has_photos = data['has_photos']
        if has_photos == '1':
            has_photos = 1
        elif has_photos == '1+':
            has_photos = 2
        
        for query in queryset:
            count = 0
            if query.photo_main:
                count += 1
            if query.photo_1:
                count += 1
            
            if count < has_photos:
                slug = query.slug
                queryset = queryset.exclude(slug__iexact=slug)
        
        open_material = data['open_material']
        queryset = queryset.filter(open_material__iexact=open_material)

        keywords = data['keywords']
        queryset = queryset.filter(description__icontains=keywords)

        serializer = MaterialSerializer(queryset, many=True)

        return Response(serializer.data)