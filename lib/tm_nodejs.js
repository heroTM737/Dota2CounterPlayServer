function logArray(array) {
    var tem = "";
    array.map((o) => tem += " " + o);
    console.log(tem);
}

module.exports = { logArray }