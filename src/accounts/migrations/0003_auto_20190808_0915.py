# Generated by Django 2.2.4 on 2019-08-08 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20190808_0437'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='gander',
            new_name='gender',
        ),
    ]
