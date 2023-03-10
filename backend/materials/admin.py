from django.contrib import admin
from .models import Material

class MaterialAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'user')
    list_display_links = ('id', 'title')
    list_filter = ('user', )
    list_editable = ('is_published', )
    search_fields = ('title', 'description', 'price')
    list_per_page = 25

admin.site.register(Material, MaterialAdmin)