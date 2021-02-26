## Ramda

### Ramda: The Functional JS Toolkit

- RamdaJS ([link](https://ramdajs.com/)) gives you many powerful expressions
- Every function is curried by default
- Like Lodash but better

### Ramda: The Functional JS Toolkit

```bash
$ npm install --save ramda
$ yarn add ramda
```

You can mess with a REPL: ([link](https://ramdajs.com/repl))

### Ramda: The Functional JS Toolkit

- All your usual functions are there: `map`, `reduce`, `any` (aka `some`), `filter`
- BUT, data always goes last

```javascript
const add3ToAll = R.map(R.add(3))
add3ToAll([1, 2, 3]) // [4, 5, 6
```

### Usage

- Import everything as R:

```javascript
import * as R from 'ramda'

R.map(R.prop('name'))
```

- Or import just what you need

```javascript
import { map, prop } from 'ramda'

map(prop('name'))
```
