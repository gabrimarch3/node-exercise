const figlet = require("figlet");

figlet("Ciao Gabriel!", function (err, data) {
    if(err) {
        console.log("qualcosa non va...");
        console.dir(err);
        return;
    }
    console.log(data);
})