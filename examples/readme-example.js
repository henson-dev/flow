(async () => {

const hf = require('henson-flow');
const assert = require('assert');

let notFlat = [
    {
        id: 0,
        res: [1, 2, 3],
    },
    {
        id: 1,
        res: [2, 4, 5],
    },
];

let flattened = await hf.yankFlat('res', notFlat);

assert([1, 2, 3, 2, 4, 5].join() === flattened.join(),
    'array should be flattened, and not re-ordered');

})();
