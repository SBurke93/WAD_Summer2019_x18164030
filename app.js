var express = require("express");
var app = express();
app.set('view engine', 'ejs'); // set the template engine 
app.use(express.static("views")); // allows access to views folder
app.use(express.static("style"));
app.use(express.static("images"));
app.use(express.static("model"));



// body parser to get information

var fs = require('fs')
var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}
));





//To ask for specific JSON files
var contact = require("./model/contact.json"); 
var teammanc = require("./model/teammanc.json");
var contactinfo = require("./model/contactinfo.json");


app.get('/', function(req, res){ // get the home page
   res.render("index");
   console.log("text sent...application is up and running, continue with development!")
});
//Team pages


app.get('/contacts', function(req, res){ // get the contacts page
   res.render("contacts", {contact}, {teammanc} );
   console.log("a user has viewed the CITY page! Once scaled log to DB.")
});

app.get('/sayHello', function(req, res){ // get the contacts page
   res.render("sayHello", {contactinfo});
   console.log("a user has viewed the contact page! Once scaled log to DB.")
});

//TEAMS
app.get('/liverpool', function(req, res){
   res.render("liverpool");
   console.log("We have a Liverpool fan, once scaled log to DB.")
});

app.get('/chelsea', function(req, res){
   res.render("chelsea");
   console.log("We have an Chelsea fan, once scaled log to DB.")
});

app.get('/manc', function(req, res){
   res.render("manc");
   console.log("We have an City fan, once scaled log to DB.")
});



app.get('/add', function(req, res){ // get the add page
   res.render("add");
   console.log("Someone is adding a transfer.")
});

// Post request to send data to server
app.post("/add", function(req,res){

   // Step 1 is to find the largest id in the JSON file
   
           function getMax(contacts, id){ // function is called getMax
           var max // the max variable is declared here but still unknown
   
               for(var i=0; i<contacts.length; i++){ // loop through the contacts in the json file as long as there are contcats to read
                   if(!max || parseInt(contact[i][id])> parseInt(max[id]))
                   max = contacts[i];
                       }
   
           return max;
            }

            
            // make a new ID for the next item in the JSON file
            
             maxCid = getMax(contact, "id") // calls the getMax function from above and passes in parameters 
            
            var newId = maxCid.id + 1; // add 1 to old largest to make ne largest
            
            // show the result in the console
            console.log("new Id is " + newId)
            
            
            // we need to get access to what the user types in the form
            // and pass it to our JSON file as the new data
            
            var contactsx = { //signing
                
                
                id: newId,
                name: req.body.name,
                nationality: req.body.nationality,
                age: req.body.age,
                position: req.body.position,
                fee: req.body.fee,
                previous: req.body.previous
                
                
            }
            
            
   fs.readFile('./model/contact.json', 'utf8',  function readfileCallback(err){
       
       if(err) {
           throw(err)
           
       } else {
           
           contact.push(contactsx); // add the new data to the JSON file
           json = JSON.stringify(contact, null, 7); // this line structures the JSON so it is easy on the eye
           fs.writeFile('./model/contact.json',json, 'utf8')
           
       }
       
   })         
            
    res.redirect('/contacts');
   
});





// *** get page to edit 
app.get('/editsigning/:id', function(req,res){
   // Now we build the actual information based on the changes made by the user 
  function chooseContact(indOne){
      return indOne.id === parseInt(req.params.id)
      }


 var indOne = contact.filter(chooseContact)
   
  res.render('editsigning', {res:indOne}); 
   
});

// ** Perform the edit
app.post('/editsigning/:id', function(req,res){
   
   // firstly we need to stringify our JSON data so it can be call as a variable an modified as needed
   var json = JSON.stringify(contact)
   
   // declare the incoming id from the url as a variable 
   var keyToFind = parseInt(req.params.id)
   
   // use predetermined JavaScript functionality to map the data and find the information I need 
   var index = contact.map(function(contact) {return contact.id}).indexOf(keyToFind)
   
   // the next three lines get the content from the body where the user fills in the form
   
   var z = parseInt(req.params.id);
   var x = req.body.name
   var y = req.body.nationality
   var w = req.body.age
   var v = req.body.position
   var u = req.body.fee
   var t = req.body.previous

  // The next section pushes the new data into the json file in place of the data to be updated  

   contact.splice(index, 1, {name: x, nationality: y, age: w, position: v, fee: u, previous: t, id: z })
   
 
   
   // now we reformat the JSON and push it back to the actual file
   json = JSON.stringify(contact, null, 7); // this line structures the JSON so it is easy on the eye
   fs.writeFile('./model/contact.json',json, 'utf8', function(){})
   
   res.redirect("/contacts");
})



app.get('/deletecontact/:id', function(req,res){
   
   
   // firstly we need to stringify our JSON data so it can be call as a variable an modified as needed
   var json = JSON.stringify(contact)
   
   // declare the incoming id from the url as a variable 
   var keyToFind = parseInt(req.params.id)
   
   // use predetermined JavaScript functionality to map the data and find the information I need 
   var index = contact.map(function(contact) {return contact.id}).indexOf(keyToFind)
   

   contact.splice(index, 1)
   
 
   
   // now we reformat the JSON and push it back to the actual file
   json = JSON.stringify(contact, null, 7); // this line structures the JSON so it is easy on the eye
   fs.writeFile('./model/contact.json',json, 'utf8', function(){})
   
   res.redirect("/contacts");
   
   
})









//Tell the app where to run and how to start
app.listen(process.env.PORT || 3000, process.IP || "0.0.0.0", function(){

   console.log("The World is at your fingertips!")

});



