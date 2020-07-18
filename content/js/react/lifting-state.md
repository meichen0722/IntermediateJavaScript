## Lifting State

### Making a Toggle Component

```javascript
const Switch = () => {
  const [on, setOn] = useState(false)
  return (
    <input type="checkbox" value={on} 
      onChange={() => { setOn(!on) }} />
  )
}

export const App = () => (
  <div className="App">
    <Switch />
  </div>
)
```

### Making a Toggle Component

Q:  How does `App` know about the "on" state of `Switch`?

### Lifting State

* Common occurrence: parent needs to know what the child is doing
* Two approaches:
  * Parent asks what child is doing
  * Parent tells what child is doing
  
### Making a Toggle Component

* Could ask `Switch` what its state is...
  * Strongly discouraged by React
  * Harder to debug, comprehend, or refactor
* Better approach: "lift state up" 

### Making a Toggle Component

```javascript
const Switch = ({ on, onChange }) => (
  <input type="checkbox" value={on} onChange={onChange} />
)

export const App = () => {
  const [on, setOn] = useState(false)
  return (
    <div className="App">
      <Switch on={on} onChange={() => { setOn(!on) }} />
    </div>
  )
}
```

Visualization: [(link)](http://localhost:3000/js/react/one-way-data/index.html)

### Making a Toggle Component

Demo: [(link)](https://codesandbox.io/s/withered-night-2qrld?file=/src/App.js)

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/floral-cherry-7jxr0?file=/src/App.js)

**Exercise 2**: [(link)](https://codesandbox.io/s/clever-edison-3w28g?file=/src/App.js)
