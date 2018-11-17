const source = '0004 9A01'
/**
 * @param {String} str
 */
function analyzeCMD(str) {
    const buf = Buffer.from(str.replace(/ /g, ''), 'hex');
    console.log(buf.readInt32BE())
}

/**
 * @param {String} str
 */
function analyzeString(str) {
    const buf = Buffer.from(str.replace(/ /g, ''), 'hex');
    console.log(buf.toString())
}

// analyzeString(source);
analyzeCMD(source)