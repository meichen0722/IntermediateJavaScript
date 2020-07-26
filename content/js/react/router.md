## React Router

### Route management

* Each **route** can be thought of as a particular view
* You may display different components for each route

### Route management

Simple solution: manage with React state!

```javascript
const routes = {
  index: <div>Index</div>,
  cage: <div>Cage</div>,
  segal: <div>Segal</div>,
}

export const App = () => {
  const [route, setRoute] = useState('index')
  const CurrentRouteDisplayed = routes[route]
  return (
    <div>
      {/* some UI to trigger route state changes... */}
      <CurrentRouteDisplayed />
    </div>
  )
}
```

### Drawbacks

Q: What are some drawbacks to this approach?

### Drawbacks

* Lose your place every time you refresh
* No permalinks
* Worse for accessibility

### React Router

**React Router** provides declarative route management for you.

Docs: [(link)](https://reactrouter.com/web/guides/quick-start)

```
yarn add react-router-dom
```

and then

```javascript
import {/* ... */} from 'react-router-dom'
```

### `<Router>`

Wraps your entire app and allows React Router to work.

* Several different options available depending on needs:
  * BrowserRouter - HTML5
  * MemoryRouter - good for tests, React Native, other non-browser environments
  * HashRouter - more backwards compatible (though less functional)

```javascript
<BrowserRouter>
  <App />
</BrowserRouter>
```

### `<Route>`

The `<Route>` component is the most important

* Takes a `path` and `children`
* When your URL matches the `path`, it renders the `children`

### `<Route>`

```javascript
<Route exact path="/home">
  <Home />
</Route>
<Route path="/news">
  <NewsFeed />
</Route>

// on /home
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>
```

### `<Route>`

`path` is a **regex match** unless you specify `exact`

```javascript
<Route path="/news">
```

matches `/news`, `/newsfeed`, `/newsletter`, etc.

```javascript
<Route exact path="/news">
```

ONLY matches `/news`

### `<Link>`

The UI component to send you to a different route

```javascript
<Link to="/news">News</Link>

// still translates for assistive tech
<a href="/news">News</a>
```

### `<Redirect>`

UI component that redirects you when it renders

```javascript
const EventualRedirect = () => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setTimeout(() => { setReady(true) }, 3000)
  })
  return (
    ready ? (
      <Redirect to="/foobar" />
    ) : (
      <p>Redirecting in 3 seconds...</p>
    )
  )
}
```

### A quick note about versions

* We'll be looking at `react-router-dom@^5.0.0`
* This version gives us access to hooks
  * Makes the DX **so** much nicer
* You may be working with an older version

### useHistory

You can programmatically change your location with `history`

```javascript
const Logout = () => {
  const history = useHistory()
  const logout = () => {
    myAuth.logout()
    history.push('/')
  }
  return (
    <button onClick={logout}>Log out</button>
  )
}
```

More on `history`: [(link)](https://reactrouter.com/web/api/history)

### useLocation

Get information about your location with `useLocation`

```javascript
const DebugRouterInfo = () => {
  const location = useLocation()
  return (
    <JSONPretty data={location} />
  )
}
```

More on `location`: [(link)](https://reactrouter.com/web/api/location)

### Exercise

**Exercise**: [(link)](https://codesandbox.io/s/router-2c253?file=/src/App.js)



