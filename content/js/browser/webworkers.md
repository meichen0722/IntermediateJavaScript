## Web Workers

### Web Workers

- JS is a single threaded environment
- Responses to user interactions (e.g. clicks) run in the same thread as everything else
- Long-running functions will "lock" the UI
- Click events won't be processed until the expensive calc finishes

### Web Workers

- Web Workers provide a way to run on a "background thread"
- Computations there do not block the main thread
- Communication occurs with "message passing"

### Demo

- ([link](http://localhost:3000/js/browser/webworkers-demo/index.html))

### Web Workers

- Create a separate JS file that is the worker file e.g. `worker.js`
- Load it into your app:

```javascript
const worker = new Worker('worker.js')
```

- Now you have a worker available!

### Web Workers

- You send messages from the main thread:

```javascript
worker.postMessage('hello world')
```

- And listen for messages on the web worker:

```javascript
onmessage = ({ data }) => {
  console.log(data) // hello world
}
```

### Web Workers

- Passing messages back to the main thread:

```javascript
postMessage('Worker finished')
```

- And listen for them on the main thread:

```javascript
worker.onmessage(({ data }) => {
  console.log(data) // Worker finished
})

// alternatively:
worker.addEventListener('message', () => {})
```

### Data is copied not shared

- If you pass an object to a worker and mutate it...

```javascript
// in main
const person = { name: 'Andrew' }
worker.postMessage(person)

// in worker
person.name = 'Billy'
postMessage('Billy')
```

The mutation in the worker *will not affect* the `person` object

### Loading other scripts

- Load other script files in the worker with `importScripts`

```javascript
importScripts('foo.js')
importScripts('//example.com/foo.js') // other domain
```

### Resources

- MDN ([link](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers))

### Exercise

- Go to http://localhost:3000/js/browser/webworkers.html
- Open `src/www/js/browser/webworkers.js` and follow instructions
