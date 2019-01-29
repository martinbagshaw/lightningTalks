const talksByTimeStamp = talks => {
    
    // clone the object
    const cloneObj = JSON.parse(JSON.stringify(talks));

    // function to sort by timestamp
    const timeSort = (a, b) => {
        const timeA = a.datetime.toUpperCase();
        const timeB = b.datetime.toUpperCase();

        let comparison = 0;
        if (timeA > timeB) {
            comparison = 1;
        } else if (timeA < timeB) {
            comparison = -1;
        }
        return comparison;
    }

    return cloneObj.sort(timeSort).map(talk => {
        // if a key in the object is true, it is a language
        const keys = Object.keys(talk);
        let languages = [];
        keys.filter(key => talk[key] === true ? languages.push(key) : '');

        // separate out date and time
        // - adapted from previous handlebars helper functions
        const a = JSON.stringify(talk.datetime).split('T');
        const newDate = `${a[0].split('-')[2]}/${a[0].split('-')[1]}/${a[0].split('-')[0].slice(1)}`;
        const newTime = a[1].match(/([^:]*:){2}/)[0].slice(0, -1);

        // return the new object
        return {
            subject: talk.subject,
            username: talk.username,
            name: talk.name,
            date: newDate,
            time: newTime,
            languages: languages
        }
    })
}
module.exports = talksByTimeStamp;