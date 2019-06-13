import json
from django.urls import reverse
from faker import Faker

from core.test_case import CommonTestCase
from core.tests import UserFactory
from core.enums import PersonGroup

from ..enums import RequestStatus
from . import EmployeeRequestFactory


from core.models import User

class RequestListAPITest(CommonTestCase):
    url = reverse('request-list')
    fake = Faker()

    def setUp(self):
        self.employee_user = UserFactory(person_group=PersonGroup.EMPLOYEE.value)
        EmployeeRequestFactory.create_batch(5, request_by=self.employee_user)

    def test_request_list_get_by_employee(self):
        user = UserFactory(person_group=PersonGroup.EMPLOYEE.value)
        EmployeeRequestFactory.create_batch(
            15,
            request_by_id=user.id,
        )

        # get user list without login
        request = self.client.get(self.url)
        self.assertPermissionDenied(request)

        login = self.client.login(email=user.email, password="testpass")
        self.assertTrue(login)

        # get user list login
        request = self.client.get(self.url)
        self.assertSuccess(request)

        # check request list total count by employee user
        # total request was created 20
        # login user is employee and this user has created 15 request
        self.assertEqual(request.data['count'], 15)

        # logout
        self.client.logout()

    def test_request_list_get_by_manage(self):
        manage_user = UserFactory(person_group=PersonGroup.MANAGE.value)
        hr_user = UserFactory(person_group=PersonGroup.HR.value)

        EmployeeRequestFactory.create_batch(
            10,
            request_by=self.employee_user,
            processed_by=hr_user,
            request_status=RequestStatus.REVIEWED.value
        )

        # get user list without login
        request = self.client.get(self.url)
        self.assertPermissionDenied(request)

        login = self.client.login(email=manage_user.email, password="testpass")
        self.assertTrue(login)

        # get user list login
        request = self.client.get(self.url)
        self.assertSuccess(request)

        # check request list total count by employee user
        # total request was created 15
        # login user is manage and so this user can access only reviewed request
        self.assertEqual(request.data['count'], 10)

        # logout
        self.client.logout()

    def test_request_list_get_by_hr(self):
        hr_user = UserFactory(person_group=PersonGroup.HR.value)
        EmployeeRequestFactory.create_batch(
            10,
            request_by=self.employee_user,
            request_status=RequestStatus.PROCESSED.value
        )
        EmployeeRequestFactory.create_batch(
            10,
            request_by=self.employee_user,
            request_status=RequestStatus.PROCESSED.value
        )

        # get user list without login
        request = self.client.get(self.url)
        self.assertPermissionDenied(request)

        login = self.client.login(email=hr_user.email, password="testpass")
        self.assertTrue(login)

        # get user list login
        request = self.client.get(self.url)
        self.assertSuccess(request)

        # check request list total count by employee user
        # total request was created 25
        # login user is hr so this user can access all request
        self.assertEqual(request.data['count'], 25)

        # logout
        self.client.logout()
