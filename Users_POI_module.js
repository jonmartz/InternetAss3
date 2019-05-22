var DButilsAzure = require('./DButils');


app.post("/savePoi", (req, res) => {
    DButilsAzure.execQuery("INSERT INTO poisOfUser VALUES (" +
        "'" + req.body.username + "', " +
        "'" + req.body.poiName + "', " +
        "'" + req.body.position + "');"
    )
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
});