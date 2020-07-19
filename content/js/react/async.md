## Async React

### What is Problematic About this Code?

```javascript
export class App extends React.Component {
  state = { todos: [] }

  render() {
    api.get('/todos')
      .then(({ data }) => this.setState({ todos: data }))

    return (
      <div>{/* display this.state.todos */}</div>
    )
  }
}
```

### What is Problematic About this Code?

It creates an infinite loop!

Why?

### What is Problematic About this Code?

* Notice how `.then` 
* It sets `todos` to a *new array* on every render.
* The new array means the state has changed, which triggers a render...
* Which triggers another network call...
* And the cycle goes on

### componentDidMount

* It's OK to trigger state changes from network calls made

```javascript
export class App extends React.Component {
  state = { todos: [] }

  async componentDidMount() {
    const { data } = await api.get('/todos')
    this.setState({ todos: data })
  }
}
```

### componentDidUpdate

```javascript
export class Loader extends React.Component {
  state = { data: [] }

  async componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ data: [] })
      const { data } = await api.get(url)
      this.setState({ data })
    }
  }
}
```
