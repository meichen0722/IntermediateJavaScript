## CRUD Operations

### CRUDdy Operations

* **C**reate
* **R**ead
* **U**pdate
* **D**elete

### Creating Items

* Let's say you have an array of `todos`
* And you want to add a new `todo` onto the array
* How would you do that?

### Creating Items

This won't work:

```javascript
export const App = () => {
  const [todos, setTodos] = useState(['One', 'Two'])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    todos.push('Three')
  }
  // ...
}
```

### Checking for Equality

* React needs to know what `props` or `state` changes
* There's two ways to check for equality:
  * Structural equality (compare all the values on an object/array)
  * Referential equality (compare if the *instance* is different)

```javascript
const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3]

// arr1 and arr2 have structural equality

// but...
arr1 === arr2 // false, referential equality
```

### Checking for Equality

Q: Advantages to using referential vs. structural equality?

### Checking for Equality

A: Faster! All about performance.

### Immutable State

* React uses **referential equality** to check for changes
* Mutating arrays / objects does not change reference
* Instead we want **immutable** operations
* How do we add an item to an array immutably?

### Immutable State

* Can use Array spread

```javascript
setTodos([...todos, newTodo])
```

### Delete

* Typically we identify the item to remove by its ID
* Can use many different tricks to remove from array
  * Ideas?

### Delete

* Common approach: `Array#filter`

```javascript
const removeTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id))
}
```

### Update

* Updates to the object also need to be immutable
* How do we accomplish that?

### Update

* Create a new copy of the array
* Find the index of the object
* Replace it with a new version of itself

### Update

* Get's the job done
* Fails the "squint test"

```javascript
const markDone = (id) => {
  const index = todos.findIndex(todo => todo.id === id)
  const todosCopy = [...todos]
  const todo = todosCopy[index]
  todosCopy[index] = { ...todo, done: true }
  setTodos(todosCopy)
}
```

### Update

* Maybe better:

```javascript
const markDone = (id) => {
  setTodos(
    todos.map(todo => (
      todo.id === id ? { ...todo, done: true } : todo),
    ),
  )
}
```

### Update

* Or, use a great library like RamdaJS
* Use `assocPath` -- set value on a object path immutably

```javascript
import { assocPath } from 'ramda'

assocPath(['a', 'b'], 42, { a: { b: 0 } }])
// => { a: { b: 42 } }
```

### Update

* Arrays are technically objects with special behavior
* Their indices are simply like keys on an object

```javascript
export const App = () => {
  // ...
  const markDone = (index) => () => {
    setTodos(assocPath([index, 'done'], true, todos))
  }
  return (
    <ul className="list-group">
      {todos.map((todo, i) => (
        <Todo key={todo.id} onDone={markDone(i)} />
      ))}
    </ul>
  )
}
```

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/solitary-hill-hyc8p?file=/src/App.js)
