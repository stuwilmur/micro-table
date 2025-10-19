// Content of clone_fallback.test.js
const clone = require('../../src/util/object/clone');

describe('Clone Function', () => {
    it('should preserve Date objects when structuredClone is available', () => {
        const date = new Date();
        const clonedDate = clone(date);
        expect(clonedDate).toEqual(date);
        expect(clonedDate).toBeInstanceOf(Date);
    });
});
