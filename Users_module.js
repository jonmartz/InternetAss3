
const jwt = require("jsonwebtoken");
var DButilsAzure = require('./DButils');

var secret = "ourSecret";

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

app.post('/login' ,async (req,res)=> {
    const user = await getUser(req.body.username);
    if(user !== null) {
        if (user.password !== req.body.password) {
            const error = "wrong password";
            res.status(403).json({error});
        } else {
            //create the token.
            const token = jwt.sign(user, secret);
            res.status(200).send(token);
        }
    }
    else {
        const error = "wrong username";
        res.status(403).json({error});
    }
});

function getUser(username) {
    return new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM users WHERE username='+"'" + username + "'");
        resolve(user[0]);
        reject("user not found");
    });
}

app.post("/private", (req, res) => {
    const token = req.header("x-auth-token");
    // no token
    if (!token) res.status(401).send("Access denied. No token provided.");
    // verify token
    try {
        req.decoded = jwt.verify(token, secret);
        res.status(200).send({ result: "valid token" });
    } catch (exception) {
        res.status(400).send({ result: "invalid token" });
    }
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



