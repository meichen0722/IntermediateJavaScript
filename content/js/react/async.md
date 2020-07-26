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

### Loading initial data

Trigger network / state changes in `componentDidMount`

```javascript
export class App extends React.Component {
  state = { todos: [] }

  async componentDidMount() {
    const { data } = await api.get('/todos')
    this.setState({ todos: data })
  }
}
```

### Loading initial data

Hooks version

```javascript
export const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = api.get('/todos')
      setTodos(data)
    })()
  })

  return (/* ... */)
}
```

### Network calls when props change

```
export const Loader = ({ resource }) => {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/${resource}`)
      setCollection(data)
    })()
  }, [resource])

  // ...
}
```

### UI updates

* Developing locally, network requests are *super fast*
* In production, network requests can take longer
* Change UI (e.g. "Saving...") in response to user actions

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/async-bmlrk?file=/src/App.js)
