**How to run the application**
Docker (no git/github required):

```
- docker pull mirceah99/nest-backend:1.0
- docker run -p 3000:3000 mirceah99/nest-backend:1.0
- docker pull mirceah99/vue-frontend:1.0
- docker run -p 8080:8080 mirceah99/vue-frontend:1.0
```

With docker-compose:

- fork project
- docker-compose up (be sure that you are in the root folder to have access to docker-compose.yml)

Node:

- fork project
- go in the backend folder and run `npm run start `
- go in the frontend folder and run ` npm run serve`

Access : [http://localhost:8080/produse](http://localhost:8080/produse)
