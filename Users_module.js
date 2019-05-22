var DButilsAzure = require('./DButils');


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

app.post("/insertQuestion", (req, res) => {
    DButilsAzure.execQuery("INSERT INTO questions VALUES (" +
        "'" + req.body.username + "', " +
        "'" + req.body.question + "', " +
        "'" + req.body.answer + "');"
    )
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
});

