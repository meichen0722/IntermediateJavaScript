## Jest: Basics

### What is Jest? ###

  * JS testing framework

  * Focus on simplicity and easy configuration

  * Easy mocking of modules

  * Good for unit and integration tests

### Example: Writing Jest Tests ###

```
const add = (x, y) => x + y

describe('#add', () => {
  it('adds two numbers together', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
```

### Running Jest Tests

  - `yarn add jest`
  - Make a `*.test.js` file
  - Run `yarn jest`, you're done!
  - Continuously watch: `yarn jest --watch`

### Most Common Matchers

`toEqual(val)`:
  : Most common equality matcher. Compares objects or arrays by comparing contents, not identity.

`toMatch(/hello/)`:
  : Tests against regular expressions or strings.

### Expecting an Error

`toThrow(message)`:
  : Tests the function will throw an error.

```
describe('#findById', () => {
  it('should throw if not a number', () => {
    expect(() => findById('invalid'))
      .toThrow('Must provide a number')
  })
})
```

### Expecting the Opposite

You can chain `not` to test the opposite

```
it('test the opposite', () => {
  expect(0).not.toEqual(1)
})
```

### Other Matchers Sometimes Used

`toContainEqual(x)`:
  : Expect an array to contain `x`.

`toBe(x)`:
  : Compares with `x` using `===`.

`toBeTruthy()`:
  : Should be true `true` when cast to a Boolean.

`toBeFalsy()`:
  : Should be `false` when cast to a Boolean.

`arrayContaining(array)`:
  : Checks it's a subset (order doesn't matter).

### What Are Spies

* Spies allow you to track calls to a method

  * Arguments

  * Results

* Passes call through to original implementation

### Spies API

Creating a spy:

```
const spy = jest.spyOn(myObject, 'method')
```

Removing a spy:

```
spy.restore()
```

### Spying on a Function or Callback (Call Tracking)

~~~ {.javascript insert="../../../src/examples/js/spy.spec.js" token="beforeEach"}
~~~

~~~ {.javascript insert="../../../src/examples/js/spy.spec.js" token="call"}
~~~

### Spying on a Function or Callback (Call Fake)

~~~ {.javascript insert="../../../src/examples/js/spy.spec.js" token="callFake"}
~~~

### Mocks

  * Mocks are functions with pre-programmed behavior

  * Can be used to replace methods or module dependencies

  * Why mock

    * Avoid expensive / slow calls (server calls, complex compuations, etc.)

    * Simplifies dependencies

    * Avoid complex test setup (e.g. dependency requires a bunch of state)

    * You follow the "London-TDD" style

### Mocks API

Creating a mock:

~~~ {.javascript}
const mock = jest.fn()
~~~

With behavior:

~~~ {.javascript}
const mock = jest.fn(() => 'yay')

mock() // 'yay'
~~~

### Mock Functions

Say we're testing a higher-order function:

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="implementation"}
~~~

### Captures Calls

You can create a mock function to capture calls.

~~~ {.javascript}
const myMock = jest.fn()
~~~

Example:

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="capture"}
~~~

### Captures all arguments

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="capture-args"}
~~~

### Provide Fake Behavior

You can specify static behavior of a mock function.

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="static-imp"}
~~~

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="static-test"}
~~~

### Provide Dynamic Behavior

You can use the arguments to a mock function to create dynamic behavior.

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="dynamic-imp"}
~~~

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="dynamic-test"}
~~~

### Mock Return Values

~~~ {.javascript insert="../../../src/examples/js/mock-fn.test.js" token="mock-return"}
~~~

### Cleanup per mock

  * **mockClear**: reset calls/results

  * **mockReset**: `mockClear` + reset return values / implementations

  * **mockRestore**: `mockReset` + restores original non-mocked implementation (for spies)

### Cleanup in beforeEach

  * **jest.clearAllMocks**

  * **jest.resetAllMocks**

  * **jest.restoreAllMocks**

### Cleanup in config

Can provide `package.json` config to do it for **all** tests:

```json
{
  "jest": {
    "clearMocks": true,
    "resetMocks": true,
    "restoreMocks": true
  }
}
```

### Exercise: Using Jest Spies

- Open `src/www/js/jest/__tests__/adder.spec.js`
- Complete the exercises.
- To test and debug, run

```
cd src
yarn jest adder.spec.js --watch
```

