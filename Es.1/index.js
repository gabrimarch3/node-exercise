const crypto = require("crypto");
const userName = crypto.randomBytes(32).toString("hex");

console.log(userName);
