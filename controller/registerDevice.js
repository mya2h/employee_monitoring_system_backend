var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var computerName = process.env['COMPUTERNAME'];
var loginId1 = path.join("domainName",userName);
var loginId2 = path.join("computerName",computerName);

console.log(loginId1);
console.log(loginId2);