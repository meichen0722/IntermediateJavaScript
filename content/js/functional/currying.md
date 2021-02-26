## Currying

### Currying

- More than a delicious food
- Developed by Haskell Curry
- Allows a function to have arguments provided at different times

### Currying

```javascript
const add = (a, b, c) => a + b + c
```

If you didn't provide all the arguments, it still runs:

```javascript
add(1) // NaN
```

### Currying

Curried functions *wait* until the rest of arguments are provided:

```javascript
const curriedAdd = curry(add) // function
const add1 = curriedAdd(1) // function
const add1And4 = add1(4) // function
const add1And4And5 = add(5) // 9
```

More generally:

```javascript
x = f(a, b, c)
x = g(a)(b)(c)
```

### Currying

Let's see the curried `add` function without the intermediate variables:

```javascript
add(1)(2)(3) // 6
add(1, 2)(3) // 6
add(1)(2, 3) // 6
add(1, 2, 3) // 6
```

### Currying

- This way you can create specialized functions

```javascript
const modulo = (x, y) => y % x
const isOdd = modulo(2)
isOdd(3) // 1, truthy
isOdd(2) // 0, falsey
```

### Currying

- Create expressive transformation functions

```javascript
const isOdd = modulo(2)
const filter = curry((f, xs) => xs.filter(f))
const getOdds = filter(isOdd)
getOdds([1, 2, 3]) // [1, 3]
```

### Currying

- The data it operates on comes last

```javascript
const filter = curry((xs, f) => xs.filter(f))
const getOdds = xs => filter(xs, isOdd) // :-(

// versus...
const filter = curry((f, xs) => xs.filter(f))
const getOdds = filter(isOdd) // :-)
```

### Currying

- Default parameters fill in slots

```javascript
const add = curry((a, b) => a + b)
add(1) // f

const add = curry((a, b = 5) => a + b)
add(1) // 6
add(1, 3) // 4
add(1)(3) // Error: not a function
```
