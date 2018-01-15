const assert = require('assert');

/** My first library! Most likely extremely ignorant, but full of functions I always end up writing */

/**
 * @param {*} test - value to test for undefined or null
 * @return {boolean} true if undefined or null
 */
const undef = test => (typeof test === 'undefined' || test === null);
module.exports.undef = undef;

/**
 * @param {*} test - value to test for undefined or null
 * @return {boolean} true if undefined or null
 */
const def = test => !undef(test);
module.exports.def = def;

/**
 * @param {*} test - value to test for undefined or null
 * @param {*} dflt - deafult value to return if null
 * @return {*} Returns test value if not undefined or null, otherwise dflt
 */
const nvl = (test, dflt) => (def(test)) ? test : dflt;
module.exports.nvl = nvl;


//
// WARNING: From here on, it's promises "..all the way down"
// additional info: http://bit.ly/1QZKEsa
//

/**
 * Parse an array, and return only the distinct results,
 * determined by the object properties named in keyProps
 *
 * @param {string[]} keyProps - Array of object properties names
 * @param {any[]} srcArry - Array of objects (should not be altered)
 * @param {boolean} oldIndex - Add old index value as new object property?
 * @return {Promise<any[]>} Distinct array determined by object properties named in keyProp
 */
const distBy = (keyProps, srcArry, oldIndex = false) => {
try {
    assert(Array.isArray(keyProps), 'keyProps should be of array type');
    assert(Array.isArray(srcArry), 'srcArry should (obviously) be an array');
    assert.equal(typeof oldIndex, 'boolean', 'oldIndex should be of boolean type');
} catch (err) {
    return updErrArg(err);
}

    let srcMap = srcArry.reduce((retMap, curr, idx) => {
        // Ask me how I know to use a literal for a key..
        let key = keyProps.map(k => curr[k]).join('~');
        let val = (oldIndex) ? Object.assign({...curr}, {oldIndex: idx}) : {...curr};
        retMap.set(key, val);

        return retMap;
    }, new Map( ));

    return Promise.resolve(Array.from(srcMap).map(([key, val]) => val));
};
module.exports.distBy = distBy;

/**
 * Flattens an array of objects, where each object has a property mapped to yet another array
 *
 * @param {string} arrayProp - Name of object property which contains the array
 * @param {[][]} arrays - One or more arrays of objects which contain 'arrayProp' property
 * @return {[]} Flattened array
 */
const yankFlat = (arrayProp, ...arrays) => {
    try {
        assert.equal(typeof arrayProp, 'string', 'arrayProp should be of strimg type');
        assert(Array.isArray(arrays), 'arrays should be of array type');
    } catch (err) {
        return updErrArg(err);
    }

    let yanked = [].concat(...arrays);
    yanked = yanked.map(m => Object.entries(m).find(e => e[0] === arrayProp)[1]);

    return Promise.resolve([].concat(...yanked));
};
module.exports.yankFlat = yankFlat;

/**
 * @param {*} obj - Object to check properties of
 * @param {[[any,any]]} keyVals - Array of key value pairs used to check obj's property equality
 * @return {Promise<boolean>} True obj properties equal the values in keyVals
 */
function hasAllProps(obj, keyVals) {
    // Fail fast if unexpected value received
    for (let [key, val] of keyVals) {
        if (obj[key] !== val) return Promise.resolve(false);
    }
    return Promise.resolve(true);
}
module.exports.hasAllVals = hasAllProps;

/**
 * Using key/value pairs to check object equality, filter an array of objects. If strict equality
 * checks are too explict, an optional boolean test can be passed as a callback.
 *
 * @param {any[]} objArr - Array of objects to filter
 * @param {[[any, any]]} keyVals - Array of key value pairs to match
 * @param {function} optTest - (optional) Additional boolean callback test
 * @return {Promise<any[]>} Array of objects, filtered by keyVal equality checks and an optional callback
 */
async function filterByProps(objArr, keyVals, optTest = null) {
    try {
        assert(Array.isArray(objArr), 'objArr should be an array');
        assert(Array.isArray(keyVals), 'keyVals should be an array');
        assert(typeof optTest === 'function' || typeof optTest === null, 'optTest should be a function');
    } catch (err) {
        return updErrArg(err);
    }

    if (optTest === null) optTest = t => true;
    return Promise.resolve(
        objArr.filter(async o => await hasAllProps(o, keyVals)).filter(t => optTest(t))
    );
}
module.exports.filterByProps = filterByProps;

/**
 * Add argument error to description
 *
 * @param {Error} err - Base error to be modified
 * @return {Promise<Error>} Arguent Error
 */
function updErrArg(err) {
    assert.equal(err.__proto__.name, 'Error', 'Argument must be Error type');
    err.name = `ARRGGGHHHH_ERROR [${err.name}]`;
    err.message = `Arrggghhhh! Error: ${err.message}`;
    return Promise.reject(err);
}
module.exports.updErrArg = updErrArg;

/**
 * Converts text like SPRIDEN_ID to text like spridenId
 *
 * @param {string} columnName - Text to convert
 * @return {Promise<string>} camelCase text
 */
function colToCaml(columnName) {
    try {
        assert.equal(typeof columnName, 'string', 'column name should be string type');
    } catch (err) {
        return updErrArg(err);
    }
    return Promise.resolve(columnName.toLowerCase( )
        .replace(/_([a-z])/g, (string, match) => match.toUpperCase( )));
}
module.exports.colToCaml = colToCaml;

/**
 * Converts text like spriden_id to text like SPRIDEN_ID
 *
 * @param {*} camelName - Text to convert
 * @return {Promise<string>} column formatted text
 */
function camlToCol(camelName) {
    try {
        assert.equal(typeof colToCaml, 'string', 'camelName should be of string type');
    } catch (err) {
        return updErrArg(err);
    }

    return Promise.resolve(
        camelName.replace(/([A-Z])/g, (string, match) => `_${match}`).toUpperCase( )
    );
}
module.exports.camlToCol = camlToCol;
