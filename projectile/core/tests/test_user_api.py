import json
from django.urls import reverse
from faker import Faker

from core.test_case import CommonTestCase
from core.models import User
from . import UserFactory

class UserAPITest(CommonTestCase):
    url = reverse('user-list')
    fake = Faker()

    def test_user_list_get(self):
        users = UserFactory.create_batch(5)

        # get user list without login
        request = self.client.get(self.url)
        self.assertPermissionDenied(request)

        login = self.client.login(email=users[0].email, password="testpass")
        self.assertTrue(login)

        # get user list login
        request = self.client.get(self.url)
        self.assertSuccess(request)

        self.assertEqual(request.data['count'], 5)

        # logout
        self.client.logout()

    def test_user_create(self):
        # create data to post request
        data = {
            "first_name": self.fake.first_name(),
            "last_name": self.fake.last_name(),
            "email": self.fake.email(),
            "password": "testpass",
            "person_group": 3,
        }

        # request with created data
        request = self.client.post(
            self.url,
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertCreated(request)
        self.assertEqual(request.data['first_name'], data['first_name'])
        self.assertEqual(request.data['email'], data['email'])

        # logout
        self.client.logout()

    def test_user_login(self):
        # set some data to create a user
        data = {
            "first_name": self.fake.first_name(),
            "last_name": self.fake.last_name(),
            "email": self.fake.email(),
            "password": "testpass",
            "person_group": 3,
        }

        # create a user
        request = self.client.post(
            self.url,
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertCreated(request)
        self.assertEqual(request.data['first_name'], data['first_name'])
        self.assertEqual(request.data['email'], data['email'])

        # get created user data
        created_user = User.objects.get(email=data['email'])
        created_user.set_password("testpass")
        created_user.save()

        # try to login with newly created user by django client login
        login = self.client.login(email=data['email'], password="testpass")
        self.assertTrue(login)

        # set data to login
        auth_data = {
            'email': created_user.email,
            'password': data['password'],
        }
        # request to login
        request = self.client.post(
            reverse('user-login'),
            data=json.dumps(auth_data),
            content_type='application/json'
        )
        self.assertSuccess(request)
        self.assertEqual(request.data['token'], created_user.auth_token.key)

        # logout
        self.client.logout()
