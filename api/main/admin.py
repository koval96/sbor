from django.contrib import admin
from main.models import Operation, ExtendedUser, Volunteer, Event, News

admin.site.register(Operation)
admin.site.register(ExtendedUser)
admin.site.register(Volunteer)
admin.site.register(Event)
admin.site.register(News)
