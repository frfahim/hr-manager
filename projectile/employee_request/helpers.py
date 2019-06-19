from core.enums import PersonGroup
from employee_request.enums import RequestStatus

def filter_employee_request_permission_wise(self, queryset):
    """
    takes queryset
    filter data by request user and request user person group wise
    return queryset
    """
    user = self.request.user.person_group
    if user:
        if PersonGroup.EMPLOYEE.value == user:
            queryset = queryset.filter(
                request_by=self.request.user
            )

        elif PersonGroup.MANAGE.value == user:
            queryset = queryset.filter(
                request_status=RequestStatus.REVIEWED.value
            )
    return queryset