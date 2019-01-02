const dateFromStamp = timeStamp => {
    return `${timeStamp.getDate()}/${timeStamp.getMonth() + 1}/${timeStamp.getFullYear()}`;
}
module.exports = dateFromStamp;