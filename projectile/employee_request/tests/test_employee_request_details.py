import json
import random
from django.urls import reverse

from core.test_case import CommonTestCase
from core.tests import UserFactory
from core.enums import PersonGroup

from ..enums import RequestStatus
from . import EmployeeRequestFactory


from core.models import User

class RequestDetailsAPITest(CommonTestCase):

    def setUp(self):
        self.user = UserFactory(person_group=PersonGroup.HR.value)
        self.created_request = EmployeeRequestFactory(request_by_id=self.user.id)
        self.url = reverse('request-details', args=[self.created_request.id])

    def test_request_details_get(self):
        # get user list without login
        request = self.client.get(self.url)
        self.assertPermissionDenied(request)

        login = self.client.login(email=self.user.email, password="testpass")
        self.assertTrue(login)

        # get user list login
        request = self.client.get(self.url)
        self.assertSuccess(request)
        self.assertEqual(request.data['id'], self.created_request.id)

        # logout
        self.client.logout()

    def test_request_details_put(self):
        status = random.choices([RequestStatus.REVIEWED.value, RequestStatus.PROCESSED.value])
        data = {
            'request_status': int(status[0]),
        }

        #  check without login
        request = self.client.patch(self.url, data)
        self.assertPermissionDenied(request)

        #  check with login
        login = self.client.login(email=self.user.email, password='testpass')
        self.assertTrue(login)
        request = self.client.patch(self.url, data=json.dumps(dict(data)), content_type='application/json')

        self.assertSuccess(request)
        self.assertEqual(request.data['request_status'], data['request_status'])

        # user logout
        self.client.logout()
