import factory

from core.tests import UserFactory
from employee_request.models import EmployeeRequest
from employee_request.enums import RequestStatus

class EmployeeRequestFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = EmployeeRequest

    title = factory.Faker('text')
    description = factory.Faker('text')
    request_status = RequestStatus.OPEN.value
    # request_by = factory.SubFactory(UserFactory)
    # processed_by = factory.SubFactory(UserFactory)
