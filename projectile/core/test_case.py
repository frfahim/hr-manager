from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class CommonTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def assertSuccess(self, request):
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def assertCreated(self, request):
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)

    def assertBadRequest(self, request):
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def assertPermissionDenied(self, request):
        self.assertEqual(request.status_code, status.HTTP_403_FORBIDDEN)

    def assertNotFound(self, request):
        self.assertEqual(request.status_code, status.HTTP_404_NOT_FOUND)
