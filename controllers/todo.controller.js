const Todo = require('../models/todo.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.todo_create = function (req, res) {
    let todo = new Todo(
        {   
            name:req.body.name,
            desc: req.body.desc,
            priority:req.body.priority,
            status: req.body.status
        }
    );
    todo.save(function (err) {
        if (err) throw err;
        res.send(todo)
    })
};

exports.todos_details = function (req, res) {
    Todo.find({}, function(err, result) {
        if (err) throw err;
        res.send(result);
      })
};

exports.todo_details = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) throw err;
        res.send(todo);
    })
};


exports.todo_update = function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, todo) {
        if (err) throw err;
        console.log("Updated the record!");
        res.send(todo);
    });
};

exports.todo_delete = function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw err;
        res.send('Deleted successfully!');
    })
};