// 2018-12-29T15:00:00.000Z

// function to convert timestamp object to date and time strings
// - this will be inverted when entering into the database
// - see FAC YAK (local, not github) for date and time entry


// timestamp is an object, not a string, so this doesn't work
// - does pass the tests though!
// const timeStampFrom = timeStamp => {
    
//     // const arr = [];
//     const parts = JSON.stringify(timeStamp).split('T');
//     const date = parts[0].substr(1);
//     const time = parts[1].match(/([^:]*:){2}/)[0].slice(0, -1);
//     console.log(date, time);
    

//     // return arr.push(date, time);
//     return {
//         date: date,
//         time: time
//     }
// }

// module.exports = timeStampFrom;