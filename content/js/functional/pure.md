## Pure Functions

### Pure Functions

1. Total
1. Deterministic
1. No observable side-effects

### Total

- One input, one output

\columnsbegin \column{.5\textwidth}

```javascript
const double = (x) => {
  if (x === 1) return 2
  if (x === 2) return 4
  if (x === 3) return 6
}
```

\column{.5\textwidth}

```javascript
const double = (x) => {
  return x * 2
}
```

\columnsend

### Deterministic

Generally, does not refer to data outside the closure

\columnsbegin \column{.5\textwidth}

```javascript
let sawTwo = false
const doubleTrouble = (x) => {
  if (x === 2) sawTwo = true
  return sawTwo ? x * 4 : x * 2
}
```

\column{.5\textwidth}

```javascript
const doubleTrouble = (x, sawTwo) => {
  return sawTwo ? x * 4 : x * 2
}
```

\columnsend

### No side effects

- No network calls, DOM updates, console.logs

\columnsbegin \column{.5\textwidth}

```javascript
const addUser = (user, users) => {
  console.log(`Saving user ${user.name}`)
  api.saveUser(user)
  return users.concat(user)
}
```

\column{.5\textwidth}

```javascript
const addUser = (user, users) => {
  return {
    state: users.concat(user),
    log: `Saving user ${user.name}`,
    network: () => { api.saveUser(user) }
  }
}
```

\columnsend

### No side effects

- No mutation

\columnsbegin \column{.5\textwidth}

```javascript
const makeDone = (todo) => {
  todo.done = true
}
```

\column{.5\textwidth}

```javascript
const markDone = (todo) => {
  return { ...todo, done: true }
}
```

\columnsend

### Immutability

- Avoid any **assignment** on a **dot or bracket accessor**

```javascript
const nums = [1, 2, 3]
nums[1] = 5 // nope

const obj = { a: 1 }
obj.a = 2 // nope
```

### Immutability

- Avoid these `Array` methods without copying first:
  - `push` / `pop`
  - `shift` / `unshift`
  - `splice`
  - `sort`    
  - `reverse`
- Avoid these `Object` methods without copying first:
  - `assign`

### Purity Tests

```javascript
const haveBirthday = (user) => {
  user.age += 1
  return user
}
```

### Purity Tests

```javascript
const isOnline = (id) => {
  return api.get('/users/${id}')
    .then(({ data }) => {
      return data.status === 'online'
    })
}
```

### Purity Tests

```javascript
const selectorText = (selector) => {
  return document
    .querySelector(selector)
    .innerText
}
```
    
### What's the point

- Easy to test
- Easy to reason about
- No hidden state
- Functional core, imperative shell
