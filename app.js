// https://www.youtube.com/watch?v=vjf774RKrLc Tutorial followed

//Packge decleration (equivalent to usings in C#)
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Import Routes
//When you reference a specific file, it will take whatever the exports are at the end of that file and grab that
const postsRoute = require('./routes/posts');

//HIDE DATA IN THE .ENV FILE WE HAVE CREATED, MAKE SURE TO IGNORE THE .ENV FILE WHEN UPLOADING TO GITHUB
//Because we npm install dotenv we can call process.env.DB_CONNECTION when making connections to the DB without hardcoding password in code
require('dotenv/config');

//This package is being executed
const app = express();
//You have the ability to create routes easily with this ^
var jsonInfo;


fs.readFile("./textfiles/example_2.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        jsonInfo = JSON.parse(jsonString);
        //console.log("Persons name is :", jsonInfo[0].first_name );
    } catch (err) {
        console.log ("Error parsing JSON String ", err)
    }
});

//Middleswares
//These execue automatically when someone initially connects
    //app.use('/test', ()=>{
    //    console.log("this is a middleware running");
    //})

 //   app.use("/", ()=> 
   // { console.log("User loaded into root")});

//This body parser has to be above the other middleware otherwise it wont work correctly and will execute out of order   
app.use(bodyParser.json());

//Cors is a middleware which makes it so that you can run the "fetch" from your website's javascript and it will reach this server without error https://youtu.be/vjf774RKrLc?list=PLPvvX-8Liux59WtnwbKBc3GDY94KWLGSs&t=3170 timestamped
app.use(cors());

app.use('/posts', postsRoute);





//app.use(auth) can be ran to check if the user is connected

//ROUTES
// This is the home address
app.get('/', (req, res) => {
    res.send(jsonInfo)
});


//app.delete
//app.post
//app.patch deletes post

//Connect to DB
// https://stackoverflow.com/questions/59578927/mongoose-connect-not-throwing-any-error-when-mongodb-is-not-running Mattia Rasulo answer
mongoose.connect(process.env.DB_CONNECTION).then(() => console.log("Connection to DB Successful")).catch((err) => {
    console.log("Printing Error");
    console.error(err)});

//Running npm start will call the START function in the package.json under the scripts header
//How we start listening to the server
app.listen(4444);

