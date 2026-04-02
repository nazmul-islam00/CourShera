# CSE-326 CourShera, a Coursera clone!


To run backend:

docker build -t backend .
docker run -d -p 5000:5000 --env-file .env --name CourShera backend

To run frontend:

docker build -t frontend .
docker run -d -p 3000:80 --env-file .env --name CourShera frontend

To run whole application:

docker-compose up --build