## `async` and `await`

### What are `async` Functions?

Functions marked as `async` become asynchronous and automatically
return promises:

~~~ {.javascript insert="../../../src/examples/js/async-await.js" token="async"}
~~~

### The `await` Keyword

Functions marked as `async` get to use the `await` keyword:

~~~ {.javascript insert="../../../src/examples/js/async-await.js" token="await"}
~~~

Question: What does the `example2` function return?

### Example of `async`/`await`

~~~ {.javascript insert="../../../src/examples/js/async-await.js" token="getArtist"}
~~~

### An Even Better Example of `async`/`await`

~~~ {.javascript insert="../../../src/examples/js/async-await.js" token="getArtistP"}
~~~

### Exercise

1. Go to http://localhost:3000/js/async/promises.html
1. Open src/www/js/async/promises.js
1. Follow prompts
