## State (Class Comp.)

### State

* The second core part of a component is **state**
* State allows a UI to have dynamic behavior
* State can track many things
  * Examples?
* Originally, state was only available for **class components**.

### State

* Components mount onto the DOM with an "initial state"

```javascript
class Counter extends React.Component {
  state = {
    count: 0
  }
  
  render() { /* ... */ }
}
```

### State

* State can be accessed in the class instance via `this.state`

```javascript
class Counter extends React.Component {
  state = { count: 0 }
  
  render() {
    console.log(this.state) // { count: 0 }
    // ...
  }
}
```

### State

* State can be set via `this.setState`
* You provide the state keys you want to update

```javascript
class SpinalTapAmp extends React.Component {
  state = { volume: 0 }

  upToEleven = () => {
    this.setState({ volume: 11 })
  }

  // ...
}
```

### State

A classic way to change state is with `<button>` clicks.

```javascript
render() {
  return (
    <button onClick={this.upToEleven}>TURN IT UP</button>
  )
}
```

We are giving `this.upToEleven` as a click handler for the `button` element.

### State

What's the difference between these two buttons?

```javascript
<button onClick={this.upToEleven}>TURN IT UP</button>

<button onClick={this.upToEleven()}>TURN IT UP</button>
```

### State

The second one won't work.

We are *invoking* `this.upToEleven` and taking its **return value** and assigning it as a click handler to the `button`.

### Showing State

* What happens when `this.setState` is invoked?
* It triggers a re-render of the component
* A component **render**s every time **props** or **state** changes
  * Otherwise, it just contentedly does nothing forever

### Showing State

* Every time the state changes, the `render` method runs

```javascript
class Counter extends React.Component {
  state = { count: 0 }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
  
  render() {
    return (
      <button onClick={this.increment}>
        Clicks: {this.state.count}
      </button>
    )
  }
}
```

### Conditional Rendering (If Statements)

Sometimes you want to conditionally show something:

```javascript
<div>
  {myConditional && (
    <p>Renders if myConditional is true</p>
  )}
</div>
```

Example [(link)](https://codesandbox.io/s/infallible-colden-0ojkv?file=/src/App.js)

### Conditional Rendering (If/Else Statements)

You can also have conditional if/else logic:

```javascript
<div>
  {myConditional ? (
    <p>Renders if myConditional is true</p>
  ) : (
    <p>Renders if myConditional is false</p>
  )}
</div>
```

### Nested Conditionals

It's fairly common to make nested ternaries.

```javascript
<div>
  {cond1 ? (
    cond2 ? (
      <p>cond1 true | cond2 true</p>
    ) : (
      <p>cond1 true | cond2 false</p>
    )
  ) : (
    <p>cond1 false</p>
  )}
</div>
```

### Demo

Example [(link)](https://codesandbox.io/s/sad-bogdan-fvkd2?file=/src/App.js)

### What's with the Funky Syntax

![](./images/up-to-eleven.jpg)

* `state` and `upToEleven` are called **public instance fields** [(link)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
* It allows initializing fields w/o using `constructor`
* Guarantees `this` will be the class instance inside a function body
  * (it **binds** `this` to the instance for the method)

### What's with the Funky Syntax

Older syntax would look like this...

```javascript
class SpinalTapAmp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { volume: 0 }
    this.upToEleven = this.upToEleven.bind(this)
  }

  upToEleven() {
    this.setState({ volume: 11 })
  }
  
  // ...
}
```

### Exercise

Exercise 1:
  * Practice showing/hiding an element by clicking a button

Exercise 2:
  * Create an app with two buttons: (+) and (-)
  * Have a counter display that increments and decrements
  * Color it red when it's below 0, green > 5, and blue > 10. Black otherwise.

Exercise 3:
  * Implement the media control buttons for a song player
  * Sandbox [(link)](https://codesandbox.io/s/trusting-chebyshev-wlbv7?file=/src/App.js)
