FROM amazonlinux:latest

# Install dependencies
RUN yum update -y
RUN yum install -y python35 gperf bison gcc
RUN curl http://ftp.gnu.org/gnu/coreutils/coreutils-8.13.tar.gz > coreutils-8.13.tar.gz
RUN tar xzvf coreutils-8.13.tar.gz > tar.log
WORKDIR coreutils-8.13
RUN ./configure
RUN make && sudo make install
RUN curl https://bootstrap.pypa.io/get-pip.py | python -

# Install app
RUN pip install Django mongoengine djangorestframework
RUN mkdir /var/web_app
ADD . /var/web_app/

EXPOSE 8000

CMD ["nohup", "python",  "/var/web_app/manage.py", "runserver", "&"]
