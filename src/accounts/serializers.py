from rest_framework import serializers
from .models import CustomUser, Job, Department
from django.contrib.auth import authenticate

#all users serializer
class AllUsersSerializer(serializers.ModelSerializer):
    jobname = serializers.ReadOnlyField(source='job.jobname')
    departmentname = serializers.ReadOnlyField(source='department.departmentname')
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password',
    'firstname',
    'lastname',
    'dateofbirth',
    'address',
    'salary',
    'ethnics',
    'phone',
    'departmentname',
    'jobname',
    'gender',)


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')


# REgister Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password',
    'firstname',
    'lastname',
    'dateofbirth',
    'address',
    'salary',
    'ethnics',
    'phone',
    'department',
    'job',
    'gender')
        extra_kwargs = {'password':{'write_only':True}}

    
    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create_user(username=validated_data['username'],
        email=validated_data['email'],password=validated_data['password'], firstname=validated_data['firstname'],
        lastname = validated_data['lastname'],
        dateofbirth =validated_data['dateofbirth'],
        address=validated_data['address'],
        salary=validated_data['salary'],
        ethnics=validated_data['ethnics'],
        phone=validated_data['phone'],
        department =validated_data['department'],
        job=validated_data['job'],
        gender=validated_data['gender'])

        return user


#Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username','password')

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Creadentials")   


# User Serializer
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        # User Serializer
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'