### Object Destructuring

Can destructure an `Object`, just like an `Array`

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="destructure"}
~~~

### Object Destructuring

You can destructure function parameters too!

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="destructure-parameter"}
~~~

### Object Destructuring

Destructuring function parameters are based on their position.

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="destructure-parameter-2"}
~~~

### Object Destructure Renaming

You can rename the destructured key to something else:

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="destructure-rename"}
~~~

### Object Rest Property

Collect the remaining props onto a separate object:

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="rest"}
~~~

### Object Spreading

Copying an object into another object:

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="spread"}
~~~

### Object Copying

Use spread to immutably copy an object:

```javascript
const obj1 = { foo: 'bar' }
const obj2 = { ...obj1 }

obj1 // { foo: 'bar' }
obj2 // { foo: 'bar' }
obj1 === obj2 // false
```

### Object Spreading

Spreading performs a shallow copy, so objects and arrays are copied by reference:

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="spread-shallow"}
~~~

### Object Spreading

Spreading performs a shallow copy, so objects and arrays are copied by reference:

~~~ {.javascript insert="../../../src/examples/es-features/es2018.js" token="spread-shallow-answer"}
~~~
