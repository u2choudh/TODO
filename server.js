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
	var queryParams = req.query;
	var filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos, {completed: false});
	}
	res.json(filteredTodos);
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

app.put('/todos/:id', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(!matchedTodo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')){
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if(body.hasOwnProperty('description')){
		return res.status(400).send();
	} 
	
	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);

})





app.listen(PORT, function(){
	console.log('Listening on ' + PORT);
});





