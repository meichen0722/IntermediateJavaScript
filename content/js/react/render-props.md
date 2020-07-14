## Render Props

### The Next Evolution: Render Props

A pattern that mostly supplanted the HOC

HOC downsides:

* Where did the data come from?
* Even more confusing with multiple HOC wrappers
* Easy name collisions

### Another Holy War

![](./images/hoc-vs-render.jpg)

Render Props could do everything HOC could do, plus some more.

But it has its own downsides.

### Render Props

A component that expects a prop that renders a component...

... and you can pass data to that function!

```javascript
<CurrentDate render={({ date }) => (
  <p>Today's Date: {date.toDateString()}</p>
)}/>
```

### Writing a Render Prop

Start with a component that renders the `render` prop...

```javascript
class CurrentDate extends React.Component {
  render() {
    return this.props.render()
  }
}
```

### Writing a Render Prop

And then add any business logic and pass it into the `render` invocation.

```javascript
class CurrentDate extends React.Component {
  state = { date: new Date() }

  render() {
    return this.props.render({ date: this.state.date })
  }
}
```

### Slightly More Complicated...

```javascript
class CurrentDate extends React.Component {
  state = { date: new Date() }

  componentDidMount() {
    this._interval = setInterval(this.updateDate, 1000)
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  updateDate = () => {
    this.setState({ date: new Date() })
  }

  /* ... */
}
```

[Example](https://codesandbox.io/s/priceless-antonelli-u0fcr?file=/src/App.js)

### You can use other props too

Another common pattern is to use `children` instead:

```javascript
<CurrentDate children={({ date }) => (
  <p>Today's Date: {date.toDateString()}</p>
)}/>
```

Which can be rewritten as:

```javascript
<CurrentDate>
  {({ date }) => (
    <p>Today's Date: {date.toDateString()}</p>
  )}
</CurrentDate>
```

### Downsides

* [Callback hell](https://twitter.com/acdlite/status/955955121979969537/photo/1)
* Can be more awkward to debug values
* Wrapped component can't have lifecycle methods

### Exercises

* [Exercise 1](https://codesandbox.io/s/optimistic-matsumoto-l2grh?file=/src/App.js)
* [Exercise 2](https://codesandbox.io/s/distracted-wind-57zfu?file=/src/App.js)
