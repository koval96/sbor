from django.contrib import admin
from main.models import Operation, ExtendedUser, Volunteer

admin.site.register(Operation)
admin.site.register(ExtendedUser)
admin.site.register(Volunteer)
