## Forms

### Forms

* Because what website can exist without one?
* Contains interactive controls for submitting information

```javascript
<form>
  {/* ... */}
</form>
```

* Common form elements
  * Examples?

### Forms

```javascript
<input type="text" name="name" /> // short text

<textarea rows={3} name="bio" /> // longer text

// dropdown
<select name="pets">
  <option value="">Which one is better?</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
</select>

// save button
<input type="submit" value="Save" />
```

### Forms in React

* There are two ways to "do forms" in React
  * **Controlled**
  * **Uncontrolled**
* It describes how the state of the form is managed

### Uncontrolled Forms

Generally an input takes two props:

* `value` -- what it is right now
* `onChange` -- what to do when the user changes it

### Uncontrolled Forms

In **uncontrolled forms**, you *don't* provide the `value` or `onChange`.

```javascript
<input type="text" />
```

React doesn't know what's in the input, it's "uncontrolled"

We'll return to this pattern later. It's cool, but calls for more advanced concepts.

### Controlled Forms

When you do provide `value` **and** `onChange`, 

it's "controlled"

```javascript
<input 
  type="text" 
  value="foo" 
  onChange={handleFn} 
/>
```

### Controlled Forms

Q: What happens when a `value` is provided but not `onChange`?

### Controlled Forms

A: The input will not display to changes and only display the `value`

### Events

* When an input is changed (i.e. keyboard input) it will fire an event
* The event is normally an `HTMLInputEvent`
* But React wraps with with a `SyntheticInputEvent` for performance reasons
* Most important thing, getting the input value:
  * For `input`, `select`, etc.: `event.target.value`
  * For checkbox/radio: `event.target.checked`

### Tracking Form Data in State

```javascript
export class App extends React.Component {
  // ...
  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  render() {
    const { name } = this.state
    return (
      <div className="App">
        <input type="text" value={name} 
               onChange={this.handleChange} />
      </div>
    )
  }
}
```

### Following Proper HTML Form Patterns

* MDN docs [(link)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
* General principles
  * All inputs have a `label` with a `htmlFor` prop that matches the input `id`
  * All inputs have a unique `id`
  * Inputs have a `name` prop that correspond to form attribute values
    * e.g. `email`, `password`, etc.
  * Prefer HTML5 validation over manual validation
  * Leverage native HTML behavior (e.g. submitting forms)

### Submitting Forms

Generally, always input elements in a `<form>`.

It gives you a bunch of desirable behavior out of the box. Also, screen-readers will thank you.

```javascript
<form onSubmit={this.handleSubmit}>
  {/* add input elements... */}
  
  {/* these two are equivalent */}
  <button type="submit">Submit</button>
  <input type="submit" value="Submit" />
</form>
```

### Submitting Forms

Code example [(link)](https://codesandbox.io/s/bold-sky-zzr7x?file=/src/App.js)

### Checkboxes / Radio buttons

Checkboxes and radio buttons use a `checked` prop:

```javascript
<input type="checkbox" checked />
```

### Checkboxes / Radio buttons

For single checkboxes it's pretty easy... 

```javascript
<input
  type="checkbox"
  checked={acceptedTerms}
  onChange={this.handleAcceptedTerms}
/>
```

### Radio Buttons

Radio buttons are a little more complicated...

```javascript
<input
  type="radio"
  checked={color === 'red'}
/>
<label>Red</label>

<input
  type="radio"
  checked={color === 'blue'}
/>
<label>Blue</label>
```

### Multiple Checkboxes

You can use `Array#includes` to your advantage:

```javascript
<div>
  <input type="checkbox" value="A" 
         checked={letters.includes('A')}>
  <label>A</label>
</div>
<div>
  <input type="checkbox" value="B" 
         checked={letters.includes('B')}>
  <label>B</label>
</div>
```

### Demo

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/magical-surf-qtfh4?file=/src/App.js)

**Exercise 2**: [(link)](https://codesandbox.io/s/muddy-bash-1opxk?file=/src/App.js)

**Exercise 3**: [(link)](https://codesandbox.io/s/compassionate-fermat-bwmus?file=/src/App.js)
