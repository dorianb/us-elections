FROM amazonlinux:latest

# Install dependencies
RUN yum update -y
RUN yum install -y python35
RUN curl https://bootstrap.pypa.io/get-pip.py | python -

# Install app
RUN pip install Django mongoengine djangorestframework
RUN mkdir /var/web_app
ADD . /var/web_app/

EXPOSE 8000

RUN nohup python /var/web_app/manage.py runserver &
