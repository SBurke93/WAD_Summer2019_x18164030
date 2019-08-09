var express = require("express");

var app = express();

app.set('view engine', 'ejs'); // set the template engine 

app.use(express.static("views")); // allows access to views folder
app.use(express.static("style"));
app.use(express.static("images"));


app.get('/', function(req, res){

res.render("index");
   res.send("Hello node community, I am  here!!!")
   console.log("text sent...application is up and running, continue with development!")
});




app.get('/contacts', function(req, res){

   res.render("contacts");
   console.log("a user has viewed the contact page!")
});
















//Tell the app where to run and how to start
app.listen(process.env.PORT || 3000, process.IP || "0.0.0.0", function(){

   console.log("The World is at your fingertips!")

});



