var DButilsAzure = require('./DButils');
var app = require('./app');

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

function getPOI(poiName) {
    return new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM pois WHERE poiName=' + "'" + poiName + "'");
        resolve(user[0]);
        reject("user not found");
    });
}


app.post('/getPOI', async (req, res) => {
    var poi = await getPOI(req.body.poiName);
    if (poi !== null) {
        res.status(200).json({ poi });
    }
});