const dateFormat = str => {
    const arr = str.split('T')[0].split('-');
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
}

const timeFormat = str => {
    return str.split('T')[1].match(/([^:]*:){2}/)[0].slice(0, -1);
}

// TO TEST:

// sort by date, bears in mind the following:
// - can't just reverse the array, talks may not be entered in chronological order
// - needs to be versatile - not just take upcoming items array
const sortDate = (arr, order) => {
    order = !order;
    arr.sort(function (a, b) {
      const x = a.datetime;
      const y = b.datetime;
      return (order ? 1 : -1);
    });
    return arr;
};


// export functions for testing
if (typeof module !== "undefined") {
    module.exports = {
        dateFormat,
        timeFormat,
        sortDate
    };
}