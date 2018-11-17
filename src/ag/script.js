function getAllString(target, alias) {
    const keys = Object.keys(target);
    const output = {};
    for (const key of keys) {
        if (typeof target[key] === 'function') {
            for (let index = 0;; index++) {
                const outputkey = `${alias}.key(${index})`
                const result = target[key](index);
                if (result) {
                    output[outputkey] = result;
                } else {
                    break;
                }
            }
        } else {
            console.log(`${key} is not a function`)
        }
    }
    return JSON.stringify(output)
}