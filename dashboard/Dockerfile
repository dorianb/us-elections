FROM amazonlinux:latest

# Install dependencies
RUN yum update -y
RUN yum install -y httpd

# Install app
RUN rm -rf /var/www/html/*
ADD build /var/www/html/

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D",  "FOREGROUND"]
