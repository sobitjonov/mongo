from django.urls import path,include
from django.conf.urls import url
from .api import RegisterAPI, LoginAPI, UserAPI, DeleteAPI, JobAPI, DepartmentAPI, AllUsersAPI
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/allusers', AllUsersAPI.as_view()),
    path('api/auth/delete/<int:id>', DeleteAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/job', JobAPI.as_view()),
    path('api/department', DepartmentAPI.as_view()),
]