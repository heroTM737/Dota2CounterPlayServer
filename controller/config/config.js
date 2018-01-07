var os = require('os');

//get local machine ip address
var networkInterfaces = os.networkInterfaces();
var ethernet = networkInterfaces.Ethernet;

var ip_v4 = "127.0.0.1";
var ip_v6 = "fe80::7177:9267:4b8b:9eca";

for (var i in ethernet) {
    if (ethernet[i].family == "IPv4") {
        ip_v4 = ethernet[i].address;
    } else if (ethernet[i].family == "IPv6") {
        ip_v6 = ethernet[i].address;
    }
}

//specific port
var app_port = 7000;
var web_port = 8080;

module.exports = {
    ip_v4,
    ip_v6,
    app_port,
    web_port
}