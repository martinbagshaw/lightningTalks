const jsonOutput = json => {

    // clone the object
    const cloneObj = JSON.parse(JSON.stringify(json));

    return cloneObj.map(talk => {
        // if a key in the object is true, it is a language
        const keys = Object.keys(talk);
        let languages = [];
        keys.filter(key => talk[key] === true ? languages.push(key) : '');

        // return the new object
        return {
            id: talk.id,
            subject: talk.subject,
            username: talk.username,
            name: talk.name,
            datetime: talk.datetime,
            languages: languages
        }
    })
}
module.exports = jsonOutput;