## HOCs

### Higher Order Components (HOCs)

The original pattern to encapsulate business logic in React.

### A simple example

Reusing logic to maintain a `toggle` state:

```javascript
class ToggleableSomething extends React.Component {
  state = {
    toggle: false,
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() { /* ... */ }
}
```

Example [(link)](https://codesandbox.io/s/heuristic-noether-m8qvo?file=/src/App.js)

### What the HOC is a HOC?

A higher order component is a component ...

* that **takes** a component
* and **returns** a component
* (...presumably with additional behavior)

### Using a HOC

Let's pretend we have a `withToggle`

When we call it with a component, we magically get one

- with `toggled` injected as a prop
- with `toggle` method available as a prop

### Using a HOC

```javascript
class Button extends React.Component {
  render() {
    const { toggle, toggled } = this.props
    return (
      <button onClick={toggle}>
        {toggled ? 'ON' : 'OFF'}
      </button>
    )
  }
}

const ToggleableButton = withToggle(Button)
```

### Writing a HOC

First, you make a function that expects a component...

... and returns a component

```javascript
const withToggle = WrappedComponent => {
  return class extends React.Component {
    /* ... */
  }
}
```

### Writing a HOC

Next, you'll want to go ahead and render the `WrappedComponent`

```javascript
const withToggle = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (<WrappedComponent />)
    }
  }
}
```

### Writing a HOC

Next, provide the special business logic

```javascript
const withToggle = WrappedComponent => {
  return class extends React.Component {
    state = { toggled: false }

    handleToggle = () => {
      this.setState({ toggled: !this.state.toggled })
    }

    render() {
      return (<WrappedComponent />)
    }
  }
}
```

### Writing a HOC

Finally, pass in the data / behavior as props

```javascript
const withToggle = WrappedComponent => {
  return class extends React.Component {
    state = { toggled: false }

    handleToggle = () => {
      this.setState({ toggled: !this.state.toggled })
    }

    render() {
      return (
        <WrappedComponent
          toggled={this.state.toggled}
          handleToggle={this.handleToggle}
        />
      )
    }
  }
}
```

### Writing a HOC

It's also considered good practice to pass along any other props given to the HOC.

```javascript
/* ... */

render() {
  return (
    <WrappedComponent
      toggled={this.state.toggled}
      handleToggle={this.handleToggle}
      {...this.props}
    />
  )
}
```

### Writing a HOC

Example [(link)](https://codesandbox.io/s/vibrant-goldstine-k6qrd?file=/src/App.js)

### Naming is hard...

This gets pretty annoying...

```javascript
class SomethingThatExpectsBehavior extends React.Component {
  /* ... */
}

const SomethingThatHasBehavior = withBehavior(
  SomethingThatExpectsBehavior
)
```

### Naming is hard...

You can inline for convenience, if you don't reuse the wrapped class.

```javascript
const SomethingThatHasBehavior = withBehavior(
  class extends React.Component {
    /* ... */
  }
)
```

### Exercise

* Exercise 1 [(link)](https://codesandbox.io/s/fervent-leavitt-jeyvz?file=/src/App.js)
* Exercise 2 [(link)](https://codesandbox.io/s/brave-lichterman-dy7v0?file=/src/App.js)
