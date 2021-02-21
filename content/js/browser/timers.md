## Timers

### setTimeout

- Tell a function to *run later*
- Waiting does not block other execution
- Only runs once

```javascript
const timeoutInMs = 1000
const doSomethingLater = () => {/* ... */}

setTimeout(doSomethingLater, timeoutInMs)
```

### setTimeout

- The contents of function do not run until *after*

```javascript
const doSomethingLater = () => {
  console.log('Later')
}
setTimeout(doSomethingLater, 1000)
console.log('Hello')

// what gets printed to console?
```

### setTimeout

- The contents of function do not run until *after*

```javascript
const doSomethingLater = () => {
  console.log('Later')
}
setTimeout(doSomethingLater, 1000)
console.log('Hello')

// what gets printed to console?
// Hello
// Later
```

### setTimeout

- Same if you inlined the function
- It's less obvious, so practice recognizing the pattern

```javascript
setTimeout(() => {
  console.log('Later')
}, 1000)
console.log('Hello')
```

### setTimeout cancellation

- Use `clearTimeout` web API
- `setTimeout` returns an `id` value that you use to reference that timer
- Pass the value to `clearTimeout` to cancel the timer 

### setTimeout cancellation

```html
<p>Live Example</p>
<button onclick="delayedAlert()">Show an alert box after two seconds</button>
<button onclick="clearAlert()">Cancel alert before it happens</button>
```

```javascript
let timeoutID
const delayedAlert = () => {
  timeoutID = setTimeout(() => window.alert('Yo'), 2000)
}
const clearAlert = () => {
  clearInterval(timeoutID)
}
```

### this darn problem strikes again

- setTimeout changes the execution context (`this`) of the function
- When the function runs, `window` will be the execution context
- If you're using the `function` syntax and `this` inside, it won't be what you think

### this darn problem strikes again

```javascript
const person = {
  name: 'Andrew',
  sayHello() {
    setTimeout(function() {
      console.log(`My name is ${this.name}`)
    }, 1000)
  }
}

person.sayHello()

// what does it print out?
```

### this darn problem strikes again

- You can use arrow functions to preserve lexical context

```javascript
const person = {
  name: 'Andrew',
  sayHello() {
    setTimeout(() => {
      console.log(`My name is ${this.name}`)
    }, 1000)
  }
}

person.sayHello() // My name is Andrew
```

### this darn problem strikes again

- Or bind the context

```javascript
const person = {
  name: 'Andrew',
  sayHello() {
    setTimeout(function() {
      console.log(`My name is ${this.name}`)
    }.bind(this), 1000)
  }
}

person.sayHello() // My name is Andrew
```

### setInterval

- Run the function at a regular interval
- Does not block other execution while waiting

```javascript
let isTick = true
const clock = () => {
  console.log(isTick ? 'tick' : 'tock')
  isTick = !isTick
}
setInterval(clock, 1000)
```

### Canceling setInterval

- Use `clearInterval`

```javascript
let isTick = true
const clock = () => {/* */}

let intervalID
const start = () => {
  intervalID = setInterval(clock, 1000)
}
const stop = () => clearInterval(intervalID)
```

### Limiting events

- Two key words: `throttle` and `debounce`
- `throttle`: *consistently* respond to a frequent event
- `debounce`: *eventually* respond to a frequent event

### Limiting events

- Throttle: only respond after X timeout; new events are ignored
- Debounce: wait X timeout before responding; new events extend timeout
- Both are implemented using `setTimeout`!
- Visualization 1 ([link](https://redd.one/blog/debounce-vs-throttle))

### Limiting events

- Both are functions that will *wrap* an event handler
- The returned function is called "throttled" or "debounced"
- You give that handler to an event listener.

```javascript
const throttledHandler = throttle(handleFn, 300)

document.getElementById('button')
  .addEventListener('click', throttledHandler)
```

### Limiting events

Example: http://localhost:3000/js/browser/throttling.html

### Limiting events

- Many application can get away with a simple implementation
- For more advanced applications, use 
  - lodash.throttle: https://www.npmjs.com/package/lodash.throttle
  - lodash.debounce: https://www.npmjs.com/package/lodash.debounce

### Exercise

#. Open http://localhost:3000/js/browser/timers.html
#. Open `www/js/browser/timers.js`
#. Follow instructions in the JS file
