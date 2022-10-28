const express = require('express');
const path = require('path'); //this allows you to set the root directory ex. path.join(__dirname) witch is the parent/root folder on get routes
const indexData = require('./db/sumn.json'); //might delete, jung said this was the homework
const app = express();
const PORT = 8080;

app.use(express.static('public')); //use whatever i put inside parenthesis. the static things in the public folder. front end info is in public folder

app.get('/', (req, res) => res.send("This shows up on the page/possible files that can b displayed"));

app.get('/api/index', (req, res) => res.json(indexData)); //might delete jung said this was the HW


app.listen(PORT, () =>
console.log(`listening at http://localhost${PORT}`) // from const app and is the method that creates the server
);


//app.listen("port varible or port number", () = {2nd value is callback function of what u want code to do when u start your server}  );