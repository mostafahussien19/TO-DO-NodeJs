var bodyParser = require("body-parser")

var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://test:test@cluster0-phten.mongodb.net/test?retryWrites=true&w=majority")
var todoSchema = new mongoose.Schema({
    item: String
})
var Todo = mongoose.model('todo', todoSchema)

//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'candy' }, { item: 'candy2' }]


var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo',{todos:data})
        })
    })
    app.post('/todo', urlencodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data)
        })
        
    })
    app.delete('/todo/:item', function (req, res) {
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err ,data){
            if (err) throw err;
            res.json(data)
        })
    })
}