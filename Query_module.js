var DButilsAzure = require('./DButils');


Query_module.get('/select', function(req, res){
    DButilsAzure.execQuery("SELECT * FROM users")
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
});