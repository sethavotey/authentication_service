const express = require('express');
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json());

const JWT_SECRETE =  "347186591486#^%%ABCF*##GHE";  


const PersonModel = require('./person_schema.js');
const dbconnect = require('./dbconnect.js');

/*
In the postman use the following URL
localhost:5002/login

{
  "email":"b@gmail.com",
  "password":"abc",
  "role":"user"
}

*/

// LOGIN API
app.post("/login", (req, res) => {
  //console.log(req.body.email)
  //console.log(req.body.password)
  //console.log(req.body.role)

  PersonModel.find({ "emailid": req.body.email, "pass": req.body.password, "role" : req.body.role})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        const token = jwt.sign({ email: req.body.email, role: req.body.role }, JWT_SECRETE, { expiresIn: '24h' })
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE Post METHOD

app.listen(5002, () => {
    console.log('Authentication Service Server is running on PORT NO: 5002')
})


