# Docker Commands to run the Container
```sh
cd frontend
docker build -t frontend .
docker run -d -p 5173:80 --name CourShera-Frontend frontend
```

# Docker Command to Stop and Remove the Container
```sh
docker rm -f CourShera-Frontend
```