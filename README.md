# Import data from .CSV file into MySQL table using Node.js
1. Create a node.js project using “npm init” and save your .csv file in the same directory. 
2. Install two packages “mysql” and “csvtojson” using the following command:

`npm i mysql2 csvtojson`

__*mysql driver:*__ This is a node.js driver for mysql. It is written in JavaScript, that does not require compiling. We are using it to establish connection with our MYSQL database and perform queries.

__*csvtojson:*__ Its a csv parser to convert csv to json or column arrays.

3. In order to run the program run index.js file using the following command:

    `node index.js`
## Explanation of code:
* At the first two lines of code we Import  mysql2 and csvtojson.

  `const csvtojson = require('csvtojson')`

  `const mysql = require("mysql2")`

* Line 10 – 23 : We created a connection to our database.

  `hostname = process.env.HOSTNAME,` 

  `username = process.env.USERNAME,         // Username of Mysql local server`

  `password = process.env.PASSWORD,         // Password of Mysql local server`

  `databsename = process.env.DATABSENAME    // Database we are connecting to`

__*Note: By default there is no .env file. So, after cloning the project create a .env file in the same directory of the project files, take the environment variables from .env.example and valorize them properly in order to make a connection to database.*__

* Line 23 – 38: We have connected to our database “csvtomysql” and created table named “code_challenge” with desired fields according to our code_challenge.csv file.
* Line 42 – 64 : We fetched code_challenge.csv located in current directory and converted all the data to JSON.
  * At line 43 all data in code_challenge.csv is converted to JSON and stored in variable “source”
  * Then we loop through each row and extracted Date, Ad_Unit_Name, Ad_Unit_ID and Typetag i.e. value from that row.
   * At line 53, we created an array of values in Date, Ad_Unit_Name, Ad_Unit_ID and Typetag i.e. the column data of ith row.
   * Then we inserted that data into table using  query “INSERT INTO code_challenge values(Date, Ad_Unit_Name, Ad_Unit_ID, Typetag, ...)”
   * At line 62 we are showing the inserted data to console. 

So, this way we can import any data form a .csv file to our MYSQL database.
