FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev

WORKDIR /app

RUN pip3 install flask Flask-Limiter

COPY . /app

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]