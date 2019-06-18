# HR Manager

HR Manager is web application that help HR department to track all request from employees of an organization.


### Tech
- Python
- Django
- Django Rest Framework
- React

### Installation
```
git clone https://github.com/frfahim/hr-manager.git
virtualenv -p python3 .
source bin/activate
cd hr-manager
pip install -r requirements.txt
cd projectile/frontend
npm install
cd ..
python manage.py migrate
python manage.py createsuperuser  #for create a super user
python manage.py runserver
```

> to install virtualenv in linux based os check this -> https://gist.github.com/frfahim/73c0fad6350332cef7a653bcd762f08d

> to install nodejs and npm check this -> https://gist.github.com/isaacs/579814/33db917b7b6737561855ac77796cc089fbc25b8b