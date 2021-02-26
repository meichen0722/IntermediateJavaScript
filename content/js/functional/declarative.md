## Declarative Programming

### Tell me What not How

- "Imperative" style focuses on **how**
- "Declarative" style focuses on **what**

### Tell me What not How

Imperative:

```javascript
const words = ['hello', 'world']
const loudWords = []
for (let i = 0; i < words.length; i++) {
  const capitalized = words[i].toUpperCase()
  loudWords.push(capitalized)
}
```

Declarative:

```javascript
const words = ['hello', 'world']
const loudWords = words.map(x => x.toUpperCase())
```

### Tell me What not How

Building blocks of declarative array processing:

- map
- reduce
- filter
- some

Q: what does each one do?

### Tell me What not How

Building blocks of declarative array processing:

- map - 1:1 transformation
- reduce - many:1 transformation
- filter - many:some transformation
- some - does any meet condition?

Q: what does each one do?

### Tell me What not How

- Create data transformation pipelines with `pipe`
- Arguments are functions that transform
- Returns a function that takes the initial data entering the pipe:

```javascript
const doubleEvenStrings = pipe(
  x => x.filter(x => x % 2 === 0),
  x => x.map(x => x * 2),
  x => x.map(x => x.toString()),
)
doubleEvenStrings([1, 2, 3, 4, 5, 6])
// ['4', '8', '12']
```

### Tell me What not How

- Abstract operations into named functions

```javascript
const isEven = x => x % 2 === 0
const double = x => x * 2
const toString = x => x.toString()

const doubleEvenStrings = pipe(
  x => x.filter(isEven),
  x => x.map(double),
  x => x.map(toString),
)
```

### Tell me What not How

- How to implement `pipe`?

```javascript
const pipe = (...transforms) => (data) => (
  transforms.reduce(
    (acc, transform) => transform(acc),
    data
  )
)
```

### Tell me What not How

- Focus on composition of functions
- Express complex transformations of data or business logic

```javascript
const isNil = x => x === 'undefined' || x === null

const hasProfile = user => !isNil(user.profile)

const usersWithProfiles = users => users.filter(hasProfile)
const profilesPresent = users => users.some(hasProfile)

const receiveUsers = (users) => {
  if (profilesPresent(users)) {
    const profileUsers = usersWithProfiles(users)
    // ...
  }
}
```

### Tell me What not How

Imperative style:

\columnsbegin \column{.5\textwidth}

~~~ {.javascript}
const doStuff = (str) => {
  const lower = str.toLowerCase()
  const words = lower.split(' ')
  
  words.reverse()

  for (let i in words) {
    words[i] = words[i].trim()
  }
  // ...
~~~

\column{.5\textwidth}

~~~ {.javascript}
  const filtered = []

  for (let i in words) {
    if (words[i].length > 3) {
      keepers.push(words[i])
    }
  }
  
  return keepers.join('')
}
~~~

\columnsend

### Tell me What not How

Functional (declarative) style:

```javascript
const doStuff = pipe(
  x => x.toLowerCase(),
  x => x.split(' '),
  xs => xs.map(x => x.trim()),
  xs => [...xs].reverse(),
  xs => xs.filter(x => x.length > 3),
  xs => xs.join(''),
)
```

### Exercise

#. Open `src/www/js/functional/declarative.test.js`

#. Follow test descriptions and keep the tests passing
