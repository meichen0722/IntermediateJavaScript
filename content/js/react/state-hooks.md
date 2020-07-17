## State (Hooks)

### Hooked on State

* **Class components** used to be the only way to get React state
* React released **hooks** in 2019
* Allows function components to also have state
* Also enabled creation of many new exciting patterns

### State Hooks

* Remember there are two key pieces to React state:
  * Current state
  * Function to update state
* And when state changes, the component re-renders
* For function components, that means re-running the function

### State Hooks

Your code will mostly look the same:

* **class component**

```javascript
<button 
  onClick={() => this.setState({ clicks: clicks + 1 })}
>
  {clicks}
</button>
```

* **function component**

```javascript
<button 
  onClick={() => setClicks(clicks + 1)}
>
  {clicks}
</button>
```

### State Hooks

How we initialize the state will take some getting used to...

We will invoke a `useState` function from React and pass in **initial state**

```javascript
useState(0) // sets the state value to `0`
```

### State Hooks

We get back a **tuple** with `[currentState, setStateFn]`

```javascript
const Clicker = () => {
  const [clicks, setClicks] = useState(0)
  // ...
}
```

### State Hooks

You can have many pieces of state.

```javascript
const Clicker = () => {
  const [clicks, setClicks] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [foo, setFoo] = useState('foo')
  // ...
}
```

**By convention**, the setter function is prefixed with `set`

(But you could technically call it anything)

### Refactoring Class to Function Component

* Turn class methods into `const` declarations
* Get rid of `this.` in front of `props`, `state`, and methods
* We'll learn later how to deal with lifecycle methods (e.g. `componentDidMount`)

[(Demo)](https://codesandbox.io/s/practical-dawn-7kl0v)

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/strange-bogdan-j9vb4?file=/src/App.js)

**Exercise 2**: [(link)](https://codesandbox.io/s/compassionate-fermat-bwmus?file=/src/App.js)
