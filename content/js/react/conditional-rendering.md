## Conditional Rendering

### Now You See Me...

Sometimes you want to conditionally show something:

```javascript
<div>
  <p>Only show for secret agents</p>
</div>
```

### Now You See Me...

We can use a trick of how JS evaluates boolean expressions to get what we want!

```javascript
true && 42 // => 42
false && 42 // => false

true && <p>This displays</p> // <p>...</p>
false && <p>This does not display</p> // false
```

### Now You See Me...

React makers thought, "What if we don't render `false` values?"

```javascript
<div>
  {true && <p>This displays</p>}
  {false && <p>This does not display</p>}
</div>
```

### Now You See Me...

Now we can use a conditional variable to be more expressive!

```javascript
<div>
  {condA && (
    <p>Renders if condA is true</p>
  )}
</div>
```

### Conditional Rendering (If/Else Statements)

You can also have conditional if/else logic:

```javascript
<div>
  {condA ? (
    <p>Renders if condA is true</p>
  ) : (
    <p>Renders if condA is false</p>
  )}
</div>
```

### Nested Conditionals

It's fairly common to make nested ternaries.

```javascript
<div>
  {condA ? (
    condB ? (
      <p>condA true + condB true</p>
    ) : (
      <p>condA true + condB false</p>
    )
  ) : (
    <p>condA false</p>
  )}
</div>
```

### Guard Components

Some components act like "guard" components.

"If some condition is met, render. Otherwise, show nothing."

To render nothing, return `null`

```javascript
if (!condA) return null

return (<p>Secret access!</p>)
```

### Exercise

Sandbox ([link](https://codesandbox.io/s/xenodochial-shirley-5fxfd?file=/src/App.js))

