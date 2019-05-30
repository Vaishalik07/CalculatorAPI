//const cors = require('cors');
//import express from 'express';

var express = require('express');
var app = express();

var bodyParser = require('body-parser'); // Decodes the incoming data in various formats
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true})); //Allows deep parsing that can deal with nested objects

app.use(bodyParser.json()) //Tells system that json has to be used


var storedHere = '';
var error = null;

app.post('/calciInput', function(request, response){
  error = null;
  var input = request.body.expression
  console.log("Calculate this: " + input)
  try{
    var output = eval(input)   //eval() function evaluates the expression
    storedHere = output
    console.log("The output:" + output)
    console.log(storedHere)
  } catch (e) {
    if(e instanceof SyntaxError) {  // instanceof tests if prototype property of a constructor appears anywhere in the prototype chain of an object.
      var error = e.message;    // message property is a human-readable desc of the error
      console.log("To err is to this: " + error)
    }
    }
    if(error == null) {
      response.send(JSON.stringify(output)); // JSON.stringify() method converts a JavaScript val or object to a JSON string
    }
    else {
      response.status(400)
    }
    //console.log(storedHere)
});

app.get('/calciHistory', function(request, response){
  response.status(200).send(JSON.stringify(storedHere));
});

app.get('/ping', function(request, response) {
  response.status(200).send("The API is alive !")
});

var PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
