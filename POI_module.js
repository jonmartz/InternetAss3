var DButilsAzure = require('./DButils');

var poiFeedback = function poiFeedback(req, res) {
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
            console.log(err);
            res.send(err)
        })
};

var getPOI = async function getPOI(req, res) {
    var poi = new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM pois WHERE poiName=' + "'" + req.body.poiName + "'");
        resolve(user[0]);
        reject("user not found");
    });
    if (poi !== null) {
        res.status(200).json({ poi });
    }
};

var GetRandomPopularPOI = function GetRandomPopularPOI(req, res) {
    DButilsAzure.execQuery('SELECT TOP 3 * FROM pois' +
    ' ORDER BY NEWID()')
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

var DetailedPOI = function DetailedPOI(req, res) {
    DButilsAzure.execQuery('SELECT * FROM pois WHERE poiName=' + "'" + req.query.id + "'")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

var GetAllPOIs = function GetAllPOIs(req, res) {
    DButilsAzure.execQuery('SELECT * FROM pois')
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

module.exports = {poiFeedback, GetRandomPopularPOI, getPOI, DetailedPOI, GetAllPOIs};