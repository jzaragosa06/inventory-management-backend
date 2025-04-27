## Description

This repository contains the solution to `Full Stack Engineer Assignment` focusing on the `backend`. 

## Project setup
Clone and navigate to the project. To run the project localy, refer to the `.sampleenv` for content of `.env`. Create a `.env` file with same variable from `.sampleenv`. Create a database schema in `Mysql` and  place it in the `DB_NAME`. Use strong `JWT_SECRET` and place it on the `.env`. 

```bash
PORT=3000

DB_TYPE="mysql" 
DB_HOST="locahost"
DB_PORT=3306
DB_USERNAME="root"
DB_PASSWORD="admin123"
DB_NAME="inventory_db"

JWT_SECRET="abc123!@#"

CLIENT_ORIGIN="https://inventory-management-backend-8krt.onrender.com/"
```

Then install the dependency. 

```bash
$ npm install
```

## Compile and run the project
To run the backend on the local computer (localhost). The project is running on port `3000`. 
```bash
# development
$ npm run start:dev

```


## Deployment
The backend is deployed on `Render.com`. It uses a Mysql database that is deployed on `Stack Hero`. 


You can view the corresponding React frontend application here: Inventory Management Frontend (https://inventory-management-frontend-blond.vercel.app/), which consumes the backend API.


The inventory management system uses Role Based Access Control (RBAC) to limit the access to specific backend resources. 
- Only Admin user should be able to Delete a product
- Only Auditor should be able to edit/update a product
- All other user should be able to View/Search as long as he/she is authenticated
## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
