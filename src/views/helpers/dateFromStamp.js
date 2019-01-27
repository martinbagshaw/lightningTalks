const dateFromStamp = timeStamp => {

    // return `${timeStamp.getDate()}/${timeStamp.getMonth() + 1}/${timeStamp.getFullYear()}`;

    const parts = JSON.stringify(timeStamp).split('T')[0].split('-');
    return `${parts[2]}/${parts[1]}/${parts[0].slice(1)}`;
 
}
module.exports = dateFromStamp;