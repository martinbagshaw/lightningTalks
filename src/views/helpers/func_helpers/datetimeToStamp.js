// impure function - takes new Date()
const datetimeToStamp = newDate => {
    return newDate.toISOString().substr(0, 19).replace(/T/gi, ' ');
}
module.exports = datetimeToStamp;