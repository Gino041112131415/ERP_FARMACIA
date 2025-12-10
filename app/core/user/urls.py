from django.urls import path
from core.user.views import (
    UserListView
)

app_name = 'user'

urlpatterns = [
    path('list/',   UserListView.as_view(),   name='user_list'),

]


