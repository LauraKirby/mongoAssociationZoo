var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require('method-override'),
	db = require("./models");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

//-------- ZOO ROUTES ----------//

//ROOT
app.get('/', function(req, res){
	res.redirect("/zoos");
});

//INDEX
app.get('/zoos', function(req, res){
	res.render('zoos/index'); 
});

//NEW
app.get('/zoos/new', function(req, res){
	res.render("zoos/new");
});

//CREATE
app.post('/zoos', function(req, res){
	res.render("/zoos");
});

//SHOW
app.get('/zoos/:id', function(req, res){
	res.render("zoos/show");
});

//EDIT
app.get('/zoos/:id/edit', function(req, res){
	res.render("zoos/edit"); 
});

//UPDATE
app.put('/zoos', function(req, res){
	res.render("zoos");
});
//DESTROY
app.delete('/zoos/:id', function(req, res){
	res.render("/zoos"); 
})

//-------- ANIMAL ROUTES ----------//

//INDEX


// CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});

// START SERVER
app.listen(3000, function(){
  "Server is listening on port 3000";
});




















