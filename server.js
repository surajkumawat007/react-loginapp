const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql');
const cors = require("cors");
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_login",
    port: 3307,
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.post('/login', (req, res) => {

    const { email, password } = req.body;
console.log("SELECT * FROM loginregister WHERE email = '"+email+"' && password = '"+password+"'");
    con.query("SELECT * FROM loginregister WHERE email = '"+email+"' && password = '"+password+"'", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({ message: "Login successfully", user: result[0] });
       
      });
  })
  
  app.post('/register', (req, res) => {

    const { fname,lname,email, password } = req.body;

 
        console.log("Connected!");
        var sql = "INSERT INTO loginregister (fname, lname,email,password) VALUES ('"+fname+"', '"+lname+"','"+email+"','"+password+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          
          return res.send(result);
        });
   



  });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(8080)