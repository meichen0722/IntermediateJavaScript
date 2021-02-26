## Point-Free Programming

### Point-Free

- Basically, writing functions without `.` accessors or anonymous functions

```javascript
// not point-free
const isOdd = x => R.modulo(x, 2) === 1
const getOdds = xs => xs.filter(isOdd)

// point-free
const isOdd = R.compose(R.equals(1), R.flip(R.modulo)(2))
const getOdds = R.filter(isOdd)
```

### Point-Free

- It can be like code golf: clever, but not always legible
- Let's say you have a list of objects and want to hydrate IDs

```javascript
const objectsList = [{ id: 1 }, { id: 2 }]
const ids = [1] // turn this into subset of `objectsList`
```

### Point-Free

- With an arrow function it's pretty easy:

```javascript
ids.map(id => R.find(R.propEq('id', id), objectsList))
```

- Without, it's a bit harder to read:

```javascript
R.map(R.compose(R.flip(R.find)(objectsList), R.propEq('id')), ids)
```

### Point-Free

- Use your judgment. Try writing it point-free to practice. 
- If it's too cumbersome, write it with an arrow function.
- **Even the authors of Ramda say this** ([link](https://stackoverflow.com/a/58738172/2672869))
- Understandable >> clever
