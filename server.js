var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	var matchedTodo = _.findWhere(todos, {id: todoId});
	
	if(matchedTodo){
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}
})

app.post('/todos', function(req, res){
	var body = req.body;

	var properBody = _.pick(body, 'description', 'completed');
	
	if(!_.isBoolean(properBody.completed) || !_.isString(properBody.description) || properBody.description.trim().length === 0){
		res.status(400).send();
	} else{

		properBody.id = todosId;
		properBody.description = properBody.description.trim();
		todosId++;
		todos.push(properBody);
		res.json(properBody);
	}
});

app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo with that id"})
	} else{
		todos = _.without(todos, matchedTodo);
		res.json(todos);
	}
})



app.listen(PORT, function(){
	console.log('Listening on ' + PORT);
});