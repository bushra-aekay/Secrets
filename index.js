import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var pw; //variable to set the pw
var userAuthorised = false; //condition for user auth

app.use(bodyParser.urlencoded({extended: true})); //to get body when pw is entered

app.use(auth); //custom middleware to check for auth

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/public/index.html"); 
});


app.post("/check", (req, res) => {
    if (userAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
        userAuthorised = false; 
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
    
});

app.listen(port, ()=>{
    console.log(`Listenin on ${port}`)
});

function auth(req, res, next){
    pw = req.body["password"]; //checking the pw from the 'password' object in body
    if (pw == "abc"){
        userAuthorised = true;
    }
    next();
}
