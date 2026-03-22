## Run Locally
---
```sh
cd backend
npm install
npx prisma generate
npm run dev
```

## Docker Commands
---
### Build and Run the Container
```sh
cd backend
docker build -t backend .
docker run -d -p 5000:5000 --env-file .env --name CourShera backend
```

### Stop and Remove the Container
```sh
docker rm -f CourShera
```