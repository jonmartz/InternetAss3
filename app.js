var express = require('express');
var app = express();
// var DButilsAzure = require('./DButils');
const bodyParser = require('body-parser');
const Users_M = require('./Users_module');
const POI_M = require('./POI_module');
const Users_POI_M = require('./Users_POI_module');
const Feedback_M = require('./Feedback_module');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', Users_M);
app.use('/poi', POI_M);
app.use('/users_poi', Users_POI_M);
app.use('/feedback', Feedback_M);


var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

