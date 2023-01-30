from rest_framework import serializers
from .models import Material

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ('title', 'price', 'material_type', 'detail_type', 'aom', 'photo_main', 'slug')

class MaterialDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'
        lookup_field = 'slug'