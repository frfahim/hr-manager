import factory

from core.models import User
from core.enums import PersonGroup

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.LazyAttribute(lambda user: '{}@mail.com'.format(user.first_name))
    password = factory.PostGenerationMethodCall('set_password', 'testpass')
    person_group = PersonGroup.EMPLOYEE.value
