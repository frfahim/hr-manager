from django.apps import AppConfig


# change model verbose name
class EmployeeRequestConfig(AppConfig):
    name = 'employee_request'
    verbose_name = "Employee Request"
