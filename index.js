import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var pw;
var userAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

app.use(auth);

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
    pw = req.body["password"];
    if (pw == "abc"){
        userAuthorised = true;
    }
    next();
}