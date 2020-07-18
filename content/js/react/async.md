## Async React


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
