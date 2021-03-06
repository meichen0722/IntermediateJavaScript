## Forms with AJAX

### Submitting Forms

- Default behavior: page loads server response
- Not so great for interactivity
- Or if you want to stay on the same page

### Submitting Forms AJAX

- Here AJAX comes back into play!
- You control the network request and how to respond to it
- Tricky part: sending all the data to the server!

### Submitting Forms AJAX

Listen to `submit` event, not `click` on Submit button!

```javascript
formEl.addEventListener('submit', () => {}) // yep
button.addEventListener('click', () => {}) // nope
```

Then you get default HTML behavior for free, like pressing Enter in a form field to submit.

### Submitting Forms AJAX

Two ways to manage form data:

- **Controlled**
- **Uncontrolled**

### Controlled Forms

**Controlled** means you're tracking form values in JS 

- Constantly keeping them in sync.
- When you send data, you just send the JS object to axios
- Send as `application/json`

```javascript
// presumably `name` and `email` exist
const user = { name, email }
axios.post('/users', { user })
```

### Controlled Forms

`application/json` payload looks like JSON:

```
{"user":{"name":"Andrew","email":"me@hello.com"}}
```

### Uncontrolled Forms

**Uncontrolled** means you leverage the form behavior and `FormData`

- No syncing with JS values
- Doesn't easily handle complex data (objects, etc.)
- Sends as `multipart/form-data` for `Content-Type`

```javascript
const form = document.querySelector('form')
const user = new FormData(form)
axios.post('/users', user)
```

### Uncontrolled Forms

`multipart/form-data` looks like this:

```
------WebKitFormBoundaryEsLOnUOv8QRFizS0
Content-Disposition: form-data; name="name"

Andrew Smith
------WebKitFormBoundaryEsLOnUOv8QRFizS0
Content-Disposition: form-data; name="email"

me@hello.com
------WebKitFormBoundaryEsLOnUOv8QRFizS0--
```

### Uncontrolled Forms

You can read from elements manually in JS, reading `value` or `checked` attributes:

```javascript
textEl.value // 'Andrew'
checkboxEl.checked // true
```

### Submitting Forms AJAX

\columnsbegin \column{.5\textwidth}

**Controlled**

- Good for complex data or UI
- Lots of event listeners, boilerplate
- Fewer "translation" errors
- Dynamic UI based on form values is easy

\column{.5\textwidth}

**Uncontrolled**

- Good for simple forms or UI
- Can upload files
- Everything are strings
- Dynamic UI based on form values is hard

\columnsend

### Controlled Forms

If you've worked with React or Angular, this is probably what you used.

```javascript
const [name, setName] = useState('')
const handleSubmit = () => {
  axios.post('/users', { user: { name } })
}
return (
  <form onSubmit={handleSubmit}>
    <input type="text" 
           onChange={e => setName(e.target.value)} />
  </form>
)
```

### Controlled Forms

* When an input is changed (i.e. keyboard input) it will fire an event
* The event is normally an `HTMLInputEvent`
* Most important thing, getting the input value:
  * For `input`, `select`, etc.: `event.target.value`
  * For checkbox/radio: `event.target.checked`
  
```javascript
inputEl.addEventListener('change', (e) => {
  console.log(e.target.value)
})
```

### Controlled Forms

In plain JS, controlled forms are pretty uncommon:

```javascript
let name
let isAdmin
inputEl.addEventListener('change', (e) => {
  name = e.target.value
})
checkboxEl.addEventListener('change', (e) => {
  isAdmin = e.target.checked
})
```

### Uncontrolled Forms

FormData ([link](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)) offers easy API to access form values.

```html
<form>
  <input name="name" type="text" />
  <input name="email" type="text" />
</form>
```

```javascript
// js
const data = new FormData(formEl)
data.get('name') // Andrew
data.get('email') // me@hello.com
```

### FormData

Disabled inputs are ignored

```html
<form>
  <input name="name" disabled="disabled" value="Andrew" />
</form>
```

```javascript
const data = new FormData(formEl)
data.get('name') // null
```

### FormData

Unchecked checkboxes / radio buttons are ignored

```html
<input type="checkbox" name="foo" value="fooVal">
<input type="checkbox" name="bar" value="barVal" checked>
```

```javascript
const data = new FormData(formEl)
data.get('foo') // null
data.get('bar') // barVal
```

### FormData

Can manually set defaults for unchecked checkboxes:

```html
<input type="checkbox" name="foo" value="1">
```

```javascript
const data = new FormData(formEl)
data.set('foo', data.has('foo') ? '1' : '0')
data.get('foo') // '0'
```

### FormData

FormData **appends** values for keys encountered multiple times

```html
<input type="text" name="foo" value="1">
<input type="text" name="foo" value="2">
```

```javascript
const data = new FormData(formEl)
data.get('foo') // '1'
data.getAll('foo') // ['1', '2']
```

### FormData

Limitation: everything is a string!

```html
<input type="number" name="foo" value="1">
```

```javascript
const data = new FormData(formEl)
data.get('foo') // '1' <-- not the number 1
```

Only `USVString`s are allowed ([link](https://developer.mozilla.org/en-US/docs/Web/API/USVString))

### Manually setting values

```javascript
const data = new FormData()
data.set('foo', 42)
data.get('foo') // '42'
```

### Sending Complex Data

With FormData, you follow a bracket convention established by PHP and Rails:

`user[name]` translates to `name` key on `user` object

So it'll look like this:

```
------WebKitFormBoundaryFEU9KykEhpGZ85xE
Content-Disposition: form-data; name="user[name]"

Andrew
```

### Sending Complex Data

Similar, fields ending with `[]` indicate array values.

`interests[]` would collect values into an array:

```
------WebKitFormBoundaryC1Q7SiFNBIEvO1AX
Content-Disposition: form-data; name="interests[]"

coding
------WebKitFormBoundaryC1Q7SiFNBIEvO1AX
Content-Disposition: form-data; name="interests[]"

tea
```

Leads to this on server: `{ interests: ['coding', 'tea'] }`

### Sending Complex Data

Combining the two, you could have:

```html
<input type="checkbox" name="user[interests][]"
       value="coding" checked>
<input type="checkbox" name="user[interests][]"
       value="reading">
<input type="checkbox" name="user[interests][]"
       value="tea" checked>
```

And that would be interpreted as:

```json
{ "user": { "interests": ["coding", "tea"] } }
```

### Sending Complex Data

- There is no standard for this, it's just convention.
- Your server may interpret `multipart/form-data` arrays and objects differently depending on your framework or parsing library
- For discussion, see: ([Link](https://stackoverflow.com/a/9547490/2672869))

### FormData

- Not all servers equipped to handle `multipart/form-data`
- Can't handle non-string data types (including objects)
- Not as efficient as `application/x-www-form-urlencoded` (most common, default `form` behavior)
- Could also translate to `application/json` for most flexibility

### FormData -> JSON

Naive approach:

```javascript
const data = new FormData(formEl)
const jsonData = Object.fromEntries(data.entries())
```

### FormData -> JSON

But this overwrites keys encountered multiple times:

```html
<input type="text" name="foo" value="1">
<input type="text" name="foo" value="2">
```

```javascript
const data = new FormData(formEl)
const jsonData = Object.fromEntries(data.entries())
// { foo: '2' }
```

### FormData -> JSON

You could write your own:

```html
<input type="text" name="foo" value="1">
<input type="text" name="foo" value="2">
```

```javascript
const data = new FormData(formEl)
const jsonData = formDataToJs(data.entries())
// { foo: ['1', '2'] }
```

Example: ([link](https://www.learnwithjason.dev/blog/get-form-values-as-json#a-full-example-of-multiple-input-types-with-the-formdata-api))

### FormData -> JSON

Or be really special and be able to parse PHP/Rails-like arrays and object syntax ([link](https://stackoverflow.com/a/9547490/2672869)):

```html
<input type="text" name="foo[]" value="1">
<input type="text" name="foo[]" value="2">
<input type="text" name="bar[baz]" value="yo">
```

```javascript
const data = new FormData(formEl)
const jsonData = formDataToJs(data.entries())
// { foo: ['1', '2'], bar: { baz: 'yo' } }
```

... but you'd have to implement it yourself.

### FormData -> JSON

Takeaway: unless you need to, just send as `multipart/form-data`

### Recap

**Controlled**

- Source of truth: JS values
- send `application/json`

**Uncontrolled**

- Source of truth: form / string values
- send `application/x-www-form-urlencoded` (default)
- send `multipart/form-data` (FormData)
- send `application/json` (FormData -> JSON)

### Recap

**Which do I choose?!**

If you want the most control/flexibility, go with controlled

If you want less boilerplate but sometimes deal with weird shims, missing checkboxes, type casting mistakes, etc., go with uncontrolled.

If you want to send a file, go with uncontrolled
