var os = require('os');

//get local machine ip address
var ifaces = os.networkInterfaces();
var ipAddressList = [];
Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {

    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    ipAddressList.push(iface.address);
  });
});

//specific port
var port = process.env.PORT || 7000;

module.exports = { ipAddressList, port }