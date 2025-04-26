## Description

This repository contains the solution to `Full Stack Engineer Assignment` focusing on the `backend`. 

## Project setup
Navigate to the project. To run the project localy, refer to the `.sampleenv` for content of `.env`. Create a `.env` file with same variable from `.sampleenv`. Create a database schema in `Mysql` and  place it in the `DB_NAME`. Use strong `JWT_SECRET` and place it on the `.env`. 

```
PORT=3000

DB_TYPE="mysql" 
DB_HOST="locahost"
DB_PORT=3306
DB_USERNAME="root"
DB_PASSWORD="admin123"
DB_NAME="inventory_db"

JWT_SECRET="abc123!@#"

CLIENT_ORIGIN="vercel.app/deployment"
```

Then install the dependency. 

```bash
$ npm install
```

## Compile and run the project
To run the backend on the local computer (localhost)
```bash
# development
$ npm run start:dev

```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Deployment

Lorem ipsum

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

lorem ipsum


## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
