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
yarn install
yarn test
```

## Usage
```javascript
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
```
