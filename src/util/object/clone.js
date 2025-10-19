// Content of clone.js file
// This file should contain the implementation of the clone function

function clone(value) {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }
    // Fallback to JSON methods
    return JSON.parse(JSON.stringify(value));
}

module.exports = clone;
