## Jest: Environment & Life Cycle

### Jest Environment

  * Each spec file runs in its **own, isolated environment**

  * `setupTestFrameworkScriptFile`: Shared, one-time setup

```json
{
  "jest": {
    "setupTestFrameworkScriptFile": "<rootDir>/setupTests.js"
  }
}
```

  * `setupFiles`: Setup files run once before every test file

### Life Cycle Callbacks

Each of the following functions takes a callback as an argument:

`beforeEach`:
  : Before each `it` is executed.

`beforeAll`:
  : Once before any `it` is executed.

`afterEach`:
  : After each `it` is executed.

`afterAll`:
  : After all `it` specs are executed.

### Abstracting Life Cycle Callbacks

These functions can be invoked from any module, as long as the calling context is within a spec file!

```javascript
// setup.js

const startWithLoggedInUser = () => {
  beforeEach(() => {
    // set up your app state to simulate a logged-in user
  })

  afterEach(() => {
    // clean up app state...
  })
}
```

### Abstracting Life Cycle Callbacks Use

```javascript
// todos.js

describe('user todos', () => {
  startWithLoggedInUser()

  it('should read user todos', () => { /* ... */ })
})
```

### Pending Tests

Tests can be marked as pending:

```javascript
it.todo('should do a thing')
```

### Focusing on Tests

You can mark only one test to be run in the file:

```javascript
it.only('should do a thing', () => {})
```
