## Promises

### Callbacks without Promises

```javascript
$.ajax('/a', (data_a) => {
  $.ajax('/b/' + data_a.id, (data_b) => {
    $.ajax('/c/' + data_b.id, (data_c) => {
      console.log('Got C: ', data_c)
    }, () => {
      console.error('Call failed')
    })
  }, () => {
    console.error('Call failed')
  })
}, () => {
  console.error('Call failed')
})
```

### Callbacks Using Promises

```javascript
$.ajax('/a')
  .then((data) => {
    return $.ajax('/b/' + data.id)
  })
  .then((data) => {
    return $.ajax('/c/' + data.id)
  })
  .then((data) => {
    console.log('Got C: ', data)
  })
  .then((data) => {
    console.log(data)
  })
  .catch((message) => {
    console.error('Something failed:', message)
  })
```

### Promise Details

  * Guarantee that callbacks are invoked (no race conditions)

  * Composable (can be chained together)

  * Flatten code that would otherwise be deeply nested

### Visualizing Promises (Composition)

![](../../../diagrams/js/promise-compose.svg)\
<!-- After diagram placeholder -->

### Visualizing Promises (Owner)

![](../../../diagrams/js/promise-owner.png)

### Example: Promise Owner

~~~ {.javascript insert="../../../src/spec/promise.spec.js" token="delayed"}
~~~

### Visualizing Promises (User)

![](../../../diagrams/js/promise-user.png)

### Promise Composition Example

~~~ {.javascript insert="../../../src/spec/promise.spec.js" token="chain"}
~~~
