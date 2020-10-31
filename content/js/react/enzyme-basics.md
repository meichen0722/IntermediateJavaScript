## React Unit Testing

### Simulating a Browser Environment

React runs in a browser. But we don't want to use a real browser for unit tests.

Enter **jsdom**: https://github.com/jsdom/jsdom

It lets you simulate most of a browser environment in a Node runtime environment.

```javascript
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<p>Hello world</p>`)
dom.window.document
  .querySelector('p').textContent // "Hello world"
```

### Rendering React Components in Test

The **enzyme** library helps with writing tests for React components.

- Mount to the jsdom
- Easy to query and traverse the React DOM tree

### Enzyme

Setup:

```
$ yarn add -D enzyme enzyme-adapter-react-16
```

### Enzyme

Then create a test setup file:

```javascript
// setupTests.js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

And make sure it's loaded by jest:

```json
"jest": {
  "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
}
```

### Enzyme

It provides a **shallow** rendering which doesn't *actually* mount to the DOM:

```javascript
import React from 'react'
import { shallow } from 'enzyme'

const App = () => <p>Hello world</p>

it('should shallow render', () => {
  const wrapper = shallow(<App />)
  console.log(wrapper.debug()) // <p>Hello world</p>
})
```

### Enzyme

Shallow rendering has many limitations:

- Incomplete browser API
- Browser events don't behave normally
- Does not render child React components

Some people say the last point is a good thing, and you should "test React components in isolation"

```javascript
const Title = () => <p>Hello world</p>
const App = () => <Title />

it('should shallow render', () => {
  const wrapper = shallow(<App />)
  console.log(wrapper.debug()) // <Title />
})
```

### What's a Unit Test Anyway

My opinion: you should create **"sociable" unit tests**. 

- Unit tests should exercise all (or most) of your UI
- No server / 3rd party interactions.
- Only mock child React components if they make your tests overly complicated.

Some industry leaders call these **integration** tests, but I think that's misleading.

### Enzyme

Instead, use **mount** to actually mount components to the DOM. Then you don't have to remember if you're shallow rendered vs. mounted, which requires different syntax.

```javascript
import React from 'react'
import { mount } from 'enzyme'

const Title = () => <p>Hello world</p>
const App = () => <Title />

it('should mount', () => {
  const wrapper = mount(<App />)
  console.log(wrapper.debug()) 
  // => <Title><p>Hello world</p></Title>
})
```

### Finding Elements

`find(query)`:
  : Finds using query selectors, returns a new `EnzymeWrapper`

```javascript
const App = () => <div><p>Hello world</p></div>

const wrapper = mount(<App />)
console.log(wrapper.debug()) // <div>...</div>

const inner = wrapper.find('p')
console.log(inner.debug()) // <p>...</p>
```

### Finding Elements

Querying by classes, IDs, or attribute names are brittle.

**Nope:**

- `.my-title`
- `#my-title`
- `h1`

If the class name changes, you tests break unexpectedly and it's hard to debug.

### Finding Elements

Instead, search by a `data-test-id` attribute given to the element.

```javascript
const App = () => (
  <h1 data-test-id="title">Hello</h1>
)
// ...

wrapper.find('[data-test-id="title"]').text()
// 'Hello'
```

Selecting this way makes the test resilient, whether you change h1 -> h2, or change the className.

### Finding Elements

Helper function so you can create specialized selectors:

```javascript
export const sel = curry((dataTestId, wrapper) =>
  wrapper.find(`[data-test-id="${dataTestId}"]`)
)

sel('title', wrapper).text() // 'Hello'
```

### Finding Elements

Move specialized selectors to the top of test file for shared behavior:

```javascript
const title = sel('title')

it('should foo', () => {
  // ...
  expect(title(wrapper).text()).toEqual('foo') 
})

it('should bar', () => {
  // ...
  expect(title(wrapper).text()).toEqual('bar') 
})
```

### Reading Text

`.text()`:
  : Grabs the human-readable text

```javascript
it('should get human-readable text', () => {
  const wrapper = mount(<App />)
  expect(wrapper.text()).toEqual(
    'Hello world' +
    'Who are you?' +
    'Click me: 0'
  )
})
```

### Simulating user behavior

`.simulate('click')`:
  : Simulates click event

```javascript
const incrementer = sel('incrementer')
it('should increment on click', () => {
  const wrapper = mount(<App />)
  expect(incrementer(wrapper).text()).toEqual('Click me: 0')
  incrementer(wrapper).simulate('click')
  expect(incrementer(wrapper).text()).toEqual('Click me: 1')
})
```

### Simulating user behavior

`.simulate('change', event)`:
  : Simulates `change` web event, passing along mock data

```javascript
const nameInput = sel('name')
it('should greet a name', () => {
  const wrapper = mount(<App />)
  nameInput(wrapper)
    .simulate('change', { target: { value: 'Andrew' } })
  expect(wrapper.text()).toMatch('Hello, Andrew!')
})
```

### Simulating user behavior

That one is pretty cumbersome, so I create a helper function:

```javascript
export const simulateChange = (wrapper, value) => (
  wrapper.simulate('change', { target: { value } })
)
```

### Avoid Testing Implementation

Some people (especially this guy [(link)](https://github.com/ljharb), who tragically works on enzyme) very vocally advocates for testing implementation.

My opinion: **do not** test implementation. Always **drive by what the user would do**.

### Demo

[(Sandbox)](https://codesandbox.io/s/enzyme-basics-m4vnp?file=/src/App.lecture.test.js)

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/enzyme-basics-m4vnp)

- (start on `NameBadge.test.js`, then do `App.test.js`)
