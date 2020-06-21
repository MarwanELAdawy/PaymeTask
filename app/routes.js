var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find((err, todos)=>{
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
}
module.exports = function (app) {
    app.get('/api/todos', (req, res)=>{
        getTodos(res);
    });
    app.post('/api/todos', (req, res)=>{
        Todo.create({
            text: req.body.text,
            done: false
        },(err, todo)=>{
            if (err)
                res.send(err);
            getTodos(res);
        });
    });
    app.delete('/api/todos/:todo_id', (req, res)=>{
        Todo.remove({
            _id: req.params.todo_id
        }, (err, todo)=>{
            if (err)
                res.send(err);
            getTodos(res);
        });
    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
