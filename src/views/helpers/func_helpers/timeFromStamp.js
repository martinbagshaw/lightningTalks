const timeFromStamp = timeStamp => {
    const parts = JSON.stringify(timeStamp).split('T')[1];
    return parts.match(/([^:]*:){2}/)[0].slice(0, -1);
}
module.exports = timeFromStamp;