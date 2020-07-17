## Lists

### Static Lists

You can manually write out a few items...

```javascript
const Todos = () => (
  <ul>
    <li>Learn JS</li>
    <li>Learn React</li>
    <li>Profit!</li>
  </ul>
)
```

### Dynamic Lists

But what do you do when your list is dynamic?

e.g. your `Todos` component takes a `todos` array as a prop?

```javascript
const Todos = ({ todos }) => (
  <ul>
    {/* ??? */}
  </ul>
)
```

### Dynamic Lists

Remember: JSX are simply JS *values*. This is valid:

```javascript
const Todos = ({ todos }) => {
  const todo1 = <li>Learn JS</li>
  const todo2 = <li>Learn React</li>
  const todo3 = <li>Profit</li>
  return (
    <ul>
      {[todo1, todo2, todo3]}
    </ul>
  )
}
```

### Dynamic Lists

So, all we need to do is transform an array of data values

into one with JSX tags.

...

What do we use to transform an array of elements

into another array with a 1:1 transformation?

### Dynamic Lists

`Array#map`

```javascript
const Todos = ({ todos }) => {
  const todosJsx = todos.map((todo) => (
    <li>{todo}</li>
  ))
  
  return (
    <ul>
      {todosJsx}
    </ul>
  )
}
```

### Dynamic Lists

Or inline it...

```javascript
const Todos = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
```

### The Key to the Kingdom

When you do this in the browser, you'll get:

![](./images/key-warning.jpg)

### The Key to the Kingdom

* `key` prop used by React to identify nodes between renders
* It allows React to reuse DOM nodes

```javascript
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
```

### A Quick Note

These examples have the elements written out.

**When you write out JSX elements individually**, you don't

need to provide a key. Only during iteration.

(They're written out to visualize more easily.)

### The Key to the Kingdom

* `key` is used by React to identify nodes between renders
* It allows React to reuse DOM nodes

\columnsbegin
\column{.5\textwidth}

```javascript
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
```

\column{.5\textwidth}

```javascript
<ul>
  <li key="c">C</li>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
```

\columnsend

The `a` and `b` elements will be reused

### The Key to the Kingdom

* Use something unique, like an ID
* Only needs to be locally unique within that list

```javascript
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
<ul>
  <li key="a">A</li> {/* same key, no problem! */}
  <li key="b">Other B</li>
</ul>
```

### Danger Zone: Index as the Key

You *can* use the element index **if** your array won't change.

```javascript
<ul>
  {arrayThatDefinitelyWontChange.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
</ul>
```

### Danger Zone: Index as the Key

Using the index can have performance downsides

and unexpected behavior [(link)](https://codesandbox.io/s/practical-fast-mmmw6?file=/src/App.js) with forms

### Exercise

* Exercise 1: [(link)](https://codesandbox.io/s/brave-curie-fuqj7?file=/src/App.js)
* Exercise 2: [(link)](https://codesandbox.io/s/charming-dew-u02ji?file=/src/App.js)
* Exercise 3: [(link)](https://codesandbox.io/s/romantic-mclean-96x34?file=/src/App.js)
