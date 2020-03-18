module.exports.response = (statusCode, body) => {
    return { statusCode, body };
}

module.exports.breakArray = (values, max = 500) => {
    const times = values.length / max;
    let nTimes = parseInt(times);
    if (times > nTimes) {
        nTimes++;
    }
    const result = [];

    for (let i = 0; i < nTimes; i++) {
        result.push(values.slice(i * max, (i + 1) * max));
    }

    return result;
}