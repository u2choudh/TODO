var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Make side projects',
	completed: false
}, {
	id: 2,
	description: 'Apply to WaterlooWorks',
	completed: false
}, {
	id: 3,
	description: 'Get and interview',
	completed: true
}];


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

app.listen(PORT, function(){
	console.log('Listening on ' + PORT);
});