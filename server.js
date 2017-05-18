var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var todos = [];
var todosId = 1;

app.use(bodyParser.json());


app.get('/', function(req, res){
	res.send('TODO root');
});

app.get('/todos', function(req, res){
	res.json(todos);
})

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	for(var i = 0; i < todos.length; i++){
		if(todos[i].id === todoId){
			res.send(todos[i]);
			return;
		}
	} 
	res.status(404).send();
})

app.post('/todos', function(req, res){
	var body = req.body;
	body.id = todosId;
	todosId++;
	todos.push(body);
	res.json(todos[0]);
});

app.listen(PORT, function(){
	console.log('Listening on ' + PORT);
});