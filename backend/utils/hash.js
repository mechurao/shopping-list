const {SHA3} = require('sha3');

function hashString(val){
    const hash = new SHA3(512);
    hash.update(val);
    return hash.digest('hex');
}

function hashMatches(hashedVal, val){
    let hashed = hashString(val);
    return hashed === hashedVal;
}

module.exports = { hashString, hashMatches };