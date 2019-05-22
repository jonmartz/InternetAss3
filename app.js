var express = require('express');
var app = express();
var DButilsAzure = require('./DButils');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

app.get('/select', function(req, res){
    DButilsAzure.execQuery("SELECT * FROM users")
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
});

app.post("/registerUser", (req, res) => {
    DButilsAzure.execQuery("INSERT INTO users VALUES (" +
        "'" + req.body.username + "', " +
        "'" + req.body.password + "', " +
        "'" + req.body.firstName + "', " +
        "'" + req.body.lastName + "', " +
        "'" + req.body.city + "', " +
        "'" + req.body.country + "', " +
        "'" + req.body.email + "', " +
        "'" + req.body.category1 + "', " +
        "'" + req.body.category2 + "');"
    )
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
});