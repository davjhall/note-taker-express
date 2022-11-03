const express = require('express');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const path = require('path'); //this allows you to set the root directory ex.) path.join(__dirname) witch is the parent/root folder on get routes
const app = express();
const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/api/notes', function(req, res) {
    var text = fs.readFileSync('./develop/db/db.json', "utf8"); // when we get the api we pull db.json
    var userNotes = [].concat(JSON.parse(text)); //concat means put everything side by side in the empty array
    res.json(userNotes);
});

app.post('/api/notes', function(req, res) { 
    req.body.id = generateUniqueId(); //using this function to generate the id for the req.body/new obj
    console.log(req.body);
    fs.readFile('./develop/db/db.json', function(err, data){
        console.log(JSON.parse(data));
        var json = JSON.parse(data); //turned the parsed data into into a var that can be used later.
        json.push(req.body); //then pushed that data into the the json variable.
        fs.writeFile('./develop/db/db.json', JSON.stringify(json), function(err, data){
            if(err) throw err;
            res.redirect(req.get('referer'));
        });
        
    });
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html")); //sends file to the public/notes.html
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});





app.listen(process.env.PORT || PORT, function () {
console.log('listening at PORT: '+ PORT);
console.log('http://localhost:' + PORT); 
});


// with app.listen("port varible or port number", () = {2nd value is callback function of what u want code to do when u start your server}  );