FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y pandoc
RUN apt-get install -y libtidy-dev


RUN apt-get install -y postgresql-client-11

# NGINX
# RUN apt-get install -y nginx
# COPY ./deploy/nginx/sites-available/ /etc/nginx/sites-available/
# RUN rm -Rf /etc/nginx/sites-enabled/default
# RUN ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app

# Install NodeJS 14 and NPM
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# EXPOSE 80

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
