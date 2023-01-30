from django.db import models
from django.utils.timezone import now
from accounts.models import UserAccount

class Material(models.Model):
    class MaterialType(models.TextChoices):
        FROM_PERSON = 'From Person'
        FROM_HEES = 'From hees'
    
    class DetailType(models.TextChoices):
        CPP = 'C++'
        JS = 'Javascript'
        PYTHON = 'Python'

    user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    material_type = models.CharField(max_length=50, choices=MaterialType.choices, default=MaterialType.FROM_PERSON)
    price = models.IntegerField()
    detail_type = models.CharField(max_length=50, choices=DetailType.choices, default=DetailType.CPP)
    aom = models.IntegerField() #  amount of material
    open_material = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title