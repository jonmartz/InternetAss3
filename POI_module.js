var DButilsAzure = require('./DButils');


app.post("/poiFeedback", (req, res) => {
    DButilsAzure.execQuery("INSERT INTO reviews VALUES (" +
        "'" + req.body.username + "', " +
        "'" + req.body.poiName + "', " +
        "'" + req.body.score + "', " +
        "'" + req.body.text + "');"
    )
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
});