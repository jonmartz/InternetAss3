function validateInjection(req) {
    var forbiddens = ["--", "=", "==", " AND ", " OR ", " and ", " or "];
    for (var key in req.body) {
        for (var str in forbiddens) {
            if (req.body[key].includes(forbiddens[str])) {
                return false;
            }
        }
    }
    return true;
}

function validateName(name) {
    return /^[A-Za-z ]+$/.test(name);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}