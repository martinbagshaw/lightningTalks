const timeFromStamp = timeStamp => {
    const parts = JSON.stringify(timeStamp).split('T');
    return parts[1].match(/([^:]*:){2}/)[0].slice(0, -1);
}
module.exports = timeFromStamp;