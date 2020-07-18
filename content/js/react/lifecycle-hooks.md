## Component Lifecycle (Hooks)

### The Dark Days of Yore...

* Before 2019, only **class components** had lifecycle methods
* Function components were sad, sad code snippets
* That all changed with Hooks!

### We Want componentDidMount!

* React function components are meant to be "pure"
* No side effects in the render
* The `componentDidMount` stuff runs *after* DOM render

### We Want componentDidMount!

* This won't work

```javascript
export const App = () => {
  const myMountingLogic = () => { /* ... */ }
  
  myMountingLogic() // nope, runs before render
  return (
    <h1>Hello world</h1>
  )
}
```

### Introducing `useEffect`

* **useEffect** provides place to put side-effects
* They run *after* the render

```javascript
import React, { useEffect } from 'react'

export const App = () => {
  const myMountingLogic = () => { /* ... */ }
  
  useEffect(myMountingLogic)
  
  return (<h1>Hello world</h1>)
}
```

### What about componentDidUpdate?

```javascript
export class App extends React.Component {
  componentDidMount() {
    this.doSomethingWithTimers()
  }
  
  componentDidUpdate() {
    this.doSomethingWithTimers() // not DRY, ugh.
  }
}
```

### What about componentDidUpdate?

* We often are doing things like subscribing/unsubscribing to things.
* Common source of bugs: forgetting to provide `componentDidUpdate`

### What about componentDidUpdate?

* Remember, function components run *on every render*
* That includes mount and update
* So, `useEffect` can be both, combined!

```javascript
export const App = () => {
  const timersStuff = () => { /* ... */ }

  // will run on mount **AND** update
  useEffect(timersStuff)

  return (
    <h1>Hello world</h1>
  )
}
```

### What about conditional componentDidUpdate?

* You can do this in class components...

```javascript
componentDidUpdate(prevProps) {
  if (prevProps.whatever !== this.props.whatever) {
    this.doSomethingWithTimers() // not DRY, ugh.
  }
}
```

### What about conditional componentDidUpdate?

* Provide an array of **watch variables** as the second argument to `useEffect`

```javascript
useEffect(callback, [watchVar1, watchVar2])

export const App = () => {
  // ...
  useEffect(() => {
    doThingWhenFooChanges()
  }, [foo])
  // ...
}
```

### What about on mount but not on update?

Q: Given we provide an array of watch variables, how could we tell `useEffect` to *never* run again?

### What about on mount but not on update?

A: Provide an empty array!

```javascript
export const App = () => {
  useEffect(() => {
    // runs only once
  }, [])

  // ...
}
```

### What about componentWillUnmount?

* Simply **return a function** from your `useEffect` function

```javascript
export const App = () => {
  useEffect(() => {
    const timer = setInterval(tick, 1000)
    // this is your componentWillUnmount
    return () => {
      clearInterval(timer)
    }
  })

  return (<h1>Hello world</h1>)
}
```

### What if I *really* need prevProps?

* Possible with `useRef`

```javascript
export const App = () => {
  const [count, setCount] = useState(0)

  const prevCountRef = useRef()
  useEffect(() => {
    prevCountRef.current = count
  })
  const prevCount = prevCountRef.current

  return (
    <div>
      <h1>Now: {count}, before: {prevCount}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}
```

### What if I *really* need prevProps?

* Can extract logic to a reusable, custom hook:

```javascript
const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
```

### What if I *really* need prevProps?

* Usage:

```javascript
export const App = () => {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  // ...
}
```

Read more: [(link)](https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/)

### useEffect

* Your one-stop-shop for *all* lifecycle methods
  * ...almost all of the time

