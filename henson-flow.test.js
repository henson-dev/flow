const hf = require('../henson-flow');
const {test} = require('ava');

test('undef() returns true if arg is undefined', t => {
    let mySillyArg;
    t.true(hf.undef(mySillyArg));
});

test('yankFlat() flattens arrays of objects, which contain arrays', async t => {
    let notFlat = [{id: 0, res: [1, 2, 3]}, {id: 1, res: [2, 4, 5]}];
    t.deepEqual([1, 2, 3, 2, 4, 5], await hf.yankFlat('res', notFlat),
        'array should be flattened, and not re-ordered'
    );
});

test('distBy() returns only distinct elements of an array', async t => {
    let notDist = [{a: 1, data: 'nope'}, {b: 2, data: 'there'}, {a: 1, data: 'hi'}];
    t.deepEqual([{a: 1, data: 'hi'}, {b: 2, data: 'there'}], await hf.distBy(['a'], notDist, false));
});
