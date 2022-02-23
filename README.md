# prodigi-backend-test

This project was made with NodeJS v16.10.0, though older version is not a problem.
However, it will create some semantic version warnings of deprecated and/or
low security packages. Means that, the installation with Node v16 will 
result in 0 vulnerability, while the older versions may result in some 
vulnerabilities and/or package incompatibility. After all, the project will run fine.

Note: 
All package installed for development environment are provided as it is in 
package.json. Packages included are the newest version, except for faker 
which will not work if the newest one installed.

Steps to install the aplication are simply entering these commands into the terminal:
1. Install all the projects dependencies: 
    - npm i
2. Create a .env file and write the following in it according to your own condition:
    HOST=<local host>
    PORT=<local port>
    DB_USERNAME=<local database username>
    DB_PASSWORD=<local database password>
    DB_NAME=<database name>
2. Create the database: 
    - sequelize db:create
3. Migrate the models: 
    - sequelize db:migrate
4. Seed some data: 
    - sequelize db:seed:all 

Here is the list of routes available: 
1. User:
    - POST: http://<host>:<port>/users/register
    - GET: http://<host>:<port>/users/all
    - GET: http://<host>:<port>/users/one/<id>
    - PUT: http://<host>:<port>/users/update/<id>
    - DELETE: http://<host>:<port>/users/delete/<user_id>

2. Admin:
    - POST: http://<host>:<port>/admins/register
    - GET: http://<host>:<port>/admins/all
    - GET: http://<host>:<port>/admins/one/<id>
    - PUT: http://<host>:<port>/admins/update/<id>
    - DELETE: http://<host>:<port>/admins/delete/<user_id>

3. Type:
    - POST: http://<host>:<port>/types/create
    - GET: http://<host>:<port>/types/all
    - GET: http://<host>:<port>/types/one/<id>
    - PUT: http://<host>:<port>/types/update/<id>
    - DELETE: http://<host>:<port>/types/delete/<user_id>

4. Brand:
    - POST: http://<host>:<port>/brands/create
    - GET: http://<host>:<port>/brands/all
    - GET: http://<host>:<port>/brands/one/<id>
    - PUT: http://<host>:<port>/brands/update/<id>
    - DELETE: http://<host>:<port>/brands/delete/<user_id>

5. Product:
    - POST: http://<host>:<port>/products/create
    - GET: http://<host>:<port>/products/all
    - GET: http://<host>:<port>/products/one/<id>
    - GET: http://<host>:<port>/products/search?title=<title> 
                            or 
    http://<host>:<port>/products/search?brand=<brand> 
                            or 
    http://<host>:<port>/products/search?type=<type> 
                            or
    http://<host>:<port>/products/search?price=<price> 
                            or 
    http://<host>:<port>/products/search?discount=<discount> 
    - PUT: http://<host>:<port>/products/update/<id>
    - DELETE: http://<host>:<port>/products/delete/<user_id>

6. Transaction:
    - POST: http://<host>:<port>/transactions/create
    - GET : http://<host>:<port>/transactions/one
    - ALL: http://<host>:<port>/transactions/all