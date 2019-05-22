import {Signer as jwt} from "node/base";

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

app.post('/login' ,async (req,res)=> {
    var message= "";
    var user = await getUser(req.body.username);
    if(user !== null) {
        if (user.password !== req.body.password) {
            message = "wrong password";
        } else {
            //create the token.
            var token = jwt.sign(user, "samplesecret");
            message = "successful login";
        }
    }
    if (token) {
        res.status(200).json({message,token});
    }
    else{
        res.status(403).json({message});
    }
});

function getUser(username) {
    return new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM users WHERE username='+"'" + username + "'");
        resolve(user[0]);
        reject("user not found");
    });
}

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



