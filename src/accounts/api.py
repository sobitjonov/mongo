from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, AllUsersSerializer, LoginSerializer, JobSerializer, DepartmentSerializer
from .models import Job, Department, CustomUser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

# REGISTER API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user =  serializer.save()
        return Response({
            "user":UserSerializer(user, 
            context=self.get_serializer_context()).data,
            'token':AuthToken.objects.create(user)[1]
        })

# REGISTER API
class DeleteAPI(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    lookup_field='id'
    # def get_queryset(self):
    #     queryset = CustomUser.objects.filter(id=self.kwargs['pk'])
    #     return queryset

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if instance.is_default == True:
    #         return Response("Cannot delete default system category", status=status.HTTP_400_BAD_REQUEST)
    #     self.perform_destroy(instance)


# LOGIN API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user =  serializer.validated_data
        return Response({
            "user":UserSerializer(user, 
            context=self.get_serializer_context()).data,
            'token':AuthToken.objects.create(user)[1]
        })

# GET USER API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# get jobs
class JobAPI(ListModelMixin, GenericAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

# get departments
class DepartmentAPI(ListModelMixin, GenericAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)




# Employee Viewset it is like Resourses/Controllers in other languages
class AllUsersAPI(generics.ListAPIView):
    model = CustomUser
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = AllUsersSerializer
    def get_queryset(self):
        sort_item= self.request.query_params.get('sort_item', '')
        sort_type =self.request.query_params.get('sort_type', '')
        lastname =self.request.query_params.get('lastname', '')
        queryset = CustomUser.objects.all()
        #http://localhost:8000/api/employee?lastname=asd
        if lastname:
            queryset = queryset.filter(lastname__startswith=lastname) 
        #http://localhost:8000/api/employee?sort_item=username&sort_type=asc
        if sort_item:
            if sort_type=='asc':
                queryset = queryset.order_by(sort_item)    
            else:
                queryset = queryset.order_by('-'+sort_item)    
        return queryset