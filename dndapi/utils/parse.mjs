const parseBoolean = (value) => {
    if (value === 'true') {
        return true;
    }
    else if (value === 'false') {
        return false;
    }
    else {
        return undefined;
    }
}


const parseArray = (value) => {
    const regex = /^\[.*\]$/;
    if (!regex.test(value)) {
        return undefined;
    }

    // https://stackoverflow.com/questions/48676751/convert-javascript-string-to-literal-array
    const array = value
        .replace(/^\[|\]$/g, '') // Remove leading and ending square brackets ([]).
        .split(',') // Split by comma.
        .map((phrase) => // Iterate over each phrase.
            phrase.trim() // Remove leading and ending whitespace.
                .replace(/"/g, '') // Remove all double quotes (").
                .replace(/^\'|\'$/g, '') // Remove leading and ending single quotes (').
        )
    return array;
}

const parseObject = (value) => {
    const regex = /^\{.*\}$/;
    if (!regex.test(value)) {
        return undefined;
    }

    return JSON.parse(value);
}


export {
    parseBoolean,
    parseArray,
    parseObject
}