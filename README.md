# henson-flow

:poop: :fire: :poop: :fire: :poop: :fire: :poop: :fire: :poop: :fire: :poop: :fire:

## Installation

Using **[yarn](https://yarnpkg.com/en/)**:
```bash
yarn add https://github.com/henson-dev/flow
```

## Running Tests

Clone the repo:
```bash
git clone https://github.com/henson-dev/flow.git henson-flow
```

Change directories and run tests:
```bash
cd ./henson-flow
yarn test
```

## Usage
```javascript
const hf = require('henson-flow');
const assert = require('assert');

let notFlat = [{
        id: 0, 
        res: [1, 2, 3]
    }, 
    {
        id: 1, 
        res: [2, 4, 5]
}];

assert.equal(
    [1, 2, 3, 2, 4, 5], 
    await hf.yankFlat('res', notFlat),
    'array should be flattened, and not re-ordered'
);
```
