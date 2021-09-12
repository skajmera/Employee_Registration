# Employee_Registration

<p>Here i created a backend of user-employee registration.
  
 * I have used JWT for authentication.
  * i have used mysql database with knex.
  * password verification i implemented bcrypt.
  * after registration user-employee can update and delete his data.
  * user can search other employee by unique id,firstname,lastname,and email.
  * user can also get data of other employee in assending order by firstname, lastname, and email <p>
  
  
  ------
 # start project
 it will initialized package.js
    
        npm init -y 
to install packages type following command
    
    
        npm i express knex mysql bcrypt jsonwebtoken morgan mysql nodemon dotenv  
**installed Dependencies**
  
      "bcrypt": "^5.0.1",
      "dotenv": "^10.0.0",
      "exprss": "0.0.1-security",
      "jsonwebtoken": "^8.5.1",
      "knex": "^0.95.11",
      "morgan": "^1.10.0",
      "mysql": "^2.18.1",
      "nodemon": "^2.0.12"
