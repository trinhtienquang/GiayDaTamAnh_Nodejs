'user strict';
const mysql = require('mysql2');


//local mysql db connection
var mysqlConnection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'admin123',
  database:'giaydatamanh'
});

// connect to database
mysqlConnection.connect((err)=>{
  if(!err)
    console.log('DB connection success')
  else
  console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
});

module.exports = mysqlConnection;