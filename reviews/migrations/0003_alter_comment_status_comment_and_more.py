# Generated by Django 5.1.3 on 2024-12-03 02:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_alter_course_course_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='status_comment',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='usertookdiscipline',
            name='semester_completed',
            field=models.IntegerField(choices=[(2019, '2019'), (2020, '2020'), (2021, '2021'), (2022, '2022'), (2023, '2023'), (2024, '2024')], verbose_name='Ano em que fez a materia'),
        ),
        migrations.CreateModel(
            name='UserReportsComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('denounce_text', models.TextField()),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='denounces', to='reviews.comment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='denounced_comments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
