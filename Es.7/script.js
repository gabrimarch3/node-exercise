const fs = require("fs");

const data = 'File con dati dentro';

fs.writeFile('file.txt', data, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("file scritto con successo\n");
        console.log("il file ha i seguenti contenuti");
        console.log(fs.readFileSync("file.txt", "utf-8"))
    }
})