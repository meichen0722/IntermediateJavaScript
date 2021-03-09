## XSS

### Disclaimer

I am not a security specialist.

### Cross Site Scripting (XSS)

- Why the X? Because CSS was already taken
- Tricking a browser into running malicious code
- Most common form of website vulnerability
- `#7` on OWASP ([link](https://owasp.org/www-project-top-ten/))

### Cross Site Scripting (XSS)

Whenever you render user input:

```
<span><%= @user.name %></span>
```

You're potentially opening yourself to XSS.

### Cross Site Scripting (XSS)

What if user name is `<script>alert('hello')</script>`?

```
<span><script>alert('hello')</script></span>
```

Now you're in trouble.

### XSS Attack Types

1. Stored - stored in DB
1. Reflected - transient server messages: "You registered ..."
1. DOM Based - no server, via query params or URL

### Likely Places

- Rendering user content
- Embedded content (iframe)
- `element.innerHTML = ...`

### innerHTML

Script tags added after initial page load via `innerHTML` **do not run and are
harmless** ([link](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations))

```javascript
const name = "<script>alert(1)</script>"
el.innerHTML = name // no alert; harmless
```

**But** there are other ways to trick `innerHTML`:

```javascript
const name = "<img src='x' onerror='alert(1)'>"
el.innerHTML = name // shows the alert
```

### Updating text

Use `innerText` instead of `innerHTML` when possible:

```javascript
// reading
spanEl.innerText // 'Hello'

// setting
spanEl.innerText = 'Goodbye'
```

### Never trust user data

Just don't.

**Especially** if it shows up to anyone else, which is basically always.

Treat user data as **values**, not **code**

### Never inject untrusted data

Doesn't matter where you put it:

```html
<!-- <%- userData %> -->
<p><%- userData %></p>
<iframe config="<%- userData %>" />
<iframe <%- userData %>="myValue" />
<style><%- userData %></style>
```

Why?

### Never inject untrusted data

They can always close out valid HTML and create a script.

```html
<!-- <%- userData %> -->
```

If userData = `--> <script>alert(1)</script> <!--`

Now we have:

```html
<!-- --> <script>alert(1)</script> <!-- -->
```

### Sanitizing Data

**Before** it's persisted

**Before** it's rendered onto the screen.

Usually involves "escaping" characters that facilitate XSS:

```
<script>alert(1></script>
"%3Cscript%3Ealert(1)%3C%2Fscript%3E"
```

### Sanitizing Data

Many rendering libraries do this for you: React, Rails, etc.

And you can "opt out" of escaping.

```
React:   <div dangerouslySetInnerHTML={"unescaped"} />
EJS:     <%- "unescaped" %>
Vue:     {{{ "unescaped" }}}
Angular: <div [innerHTML]="Unescaped" />
```

### Sanitizing Data

Sometimes you really need custom CSS, HTML, etc. from user

Use sanitizer library like DOMPurify ([link](https://github.com/cure53/DOMPurify)) to take out potentially malicious content.

```html
<!-- before -->
<p>Hello</p>
<img src=x onerror="alert('XSS Attack')">

<!-- after -->
<p>Hello</p>
<img src="x">
```

### Exercise

1. Open http://localhost:3000/js/security/xss.html
1. Open `src/www/js/security/xss.js` to start
