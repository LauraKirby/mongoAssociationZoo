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
	db.Zoo.find({}, 
		function(err, zoos){
			res.render('zoos/index', {zoos:zoos});  
	});	
});

//NEW
app.get('/zoos/new', function(req, res){
	res.render("zoos/new");
});

//CREATE
app.post('/zoos', function(req, res){
	db.Zoo.create({name: req.body.name, location: req.body.location}, 
		function(err, zoo) {
			if(err){
				console.log(err); 
				res.render("zoos/new"); 
			}
			else {
				console.log(zoo); 
				res.redirect("/zoos"); 
			}
		});
});

//SHOW
app.get('/zoos/:id', function(req, res){
	db.Zoo.findById(req.params.id, 
		function(err, zoo) {
			db.Animal.find(
			{
				_id:{$in: zoo.animals}
			}, 
			function(err, animals){
				res.render("zoos/show", {zoo:zoo, animals:animals});
			});
		});
	//console.log(db.Zoo.findById(req.params.id)); 
});

//EDIT
app.get('/zoos/:id/edit', function(req, res){
	db.Zoo.findById(req.params.id, 
		function(err, zoo){
			res.render("zoos/edit", {zoo:zoo}); 
		})
});

//UPDATE
app.put('/zoos/:id', function(req, res){
	db.Zoo.findByIdAndUpdate(req.params.id, {name: req.body.name, location: req.body.location},
		function(err, zoo) {
			if(err) {
				res.render("zoos/edit"); 
			}
			else {
				res.redirect("/zoos"); 
			}
		});
});

//DESTROY
app.delete('/zoos/:id', function(req, res){
	db.Zoo.findById(req.params.id, 
		function(err, zoo){
			if(err) {
				console.log(err); 
				res.render("zoos/show"); 
			}
			else {
				zoo.remove(); 
				res.redirect("/zoos"); 
			}
		});
});

//-------- ANIMAL ROUTES ----------//

//INDEX
app.get('/zoos/:zoo_id/animals', function(req, res){
	db.Zoo.findById(req.params.zoo_id).populate('animals')
	.exec(function(err,zoo){
		res.render("animals/index", {zoo:zoo});
	});
});

//NEW
app.get('/zoos/:zoo_id/animals/new', function(req, res){
	db.Zoo.findById(req.params.zoo_id,
		function(err, zoo) {
			res.render('animals/new', {zoo:zoo}); 
		});
});

//CREATE
app.post('/zoos/:zoo_id/animals', function(req, res){
	res.redirect('/zoos');
})

//SHOW
app.get('/zoos/:zoo_id/animals', function(req, res){
	res.render('animals/show'); 
}); 

//EDIT
app.get('/zoos/:zoo_id/animals/:id/edit', function(req, res){
	res.render('animals/edit');
});

//UPDATE
app.put('/zoos/:zoo_id/animals/:id', function(req, res){
	res.redirect("/zoos");
});

//DESTROY
app.delete('/zoos/:zoo_id/animals/:id', function(req, res){
	res.redirect("/zoos"); 
});


// CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});

// START SERVER
app.listen(3000, function(){
  "Server is listening on port 3000";
});




















