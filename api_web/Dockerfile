FROM amazonlinux:latest

# Install dependencies
RUN yum update -y
RUN yum install -y python35
RUN curl https://bootstrap.pypa.io/get-pip.py | python -

# Install app
RUN pip install Django mongoengine djangorestframework django-cors-headers pandas
RUN mkdir /var/web_app
ADD . /var/web_app/

EXPOSE 8000

CMD ["python", "/var/web_app/manage.py", "runserver", "0.0.0.0:8000"]
