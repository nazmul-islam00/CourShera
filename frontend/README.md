## Run Locally
---
```sh
cd frontend
npm install
npm run dev
```

## Docker Commands
---
### Build and Run the Container
```sh
cd frontend
docker build -t frontend .
docker run -d -p 5173:80 --name CourShera-Frontend frontend
```

### Stop and Remove the Container
```sh
docker rm -f CourShera-Frontend
```