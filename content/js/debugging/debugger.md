## Debugger

### DevTools

Drop a `debugger` statement to open breakpoint in DevTools

```javascript
const sayHello = () => {
  debugger
  console.log('Hello')
}
sayHello()
```

### DevTools

![](./images/chrome-setup1.jpg)

### DevTools

Finding an event handler:

![](./images/devtools1.jpg)

### DevTools

You can look at the handlers on a specific element:

![](./images/devtools2.jpg)

Or with `getEventListeners(element)`

### DevTools

See what events are happening for an element:

```javascript
monitorEvents(btnElement)
```

![](./images/devtools3.jpg)

### DevTools

Pause on exceptions and hop into debugger:

![](./images/devtools4.jpg)

This also works with failed `console.assert`ions!

### VS Code Debugger

Install Debugger for Chrome

1. Open command palette (Cmd+P / Ctrl+P)
1. Choose "Extensions: Install Extensions"
1. Search for "Debugger for Chrome" and install

![](./images/vscode-setup0.jpg)

### VS Code Debugger

Set up Chrome debugger configuration

![](./images/vscode-setup1.jpg)

Then choose "Chrome"

### VS Code Debugger

Two request options:

- **launch** - starts new Chrome instance
- **attach** - attaches to existing Chrome instance

We'll use **launch** because starting up Chrome with debugger is tedious.

### VS Code Debugger

- **url**: the URL to open in debugger
- **webRoot**: how to map URLs from browser to files on disk
  - e.g. be able to locate `http://localhost:3000/someFolder/foo.js`
  - in our case, served from `${workspaceFolder}/src/www`

![](./images/vscode-setup2.jpg)

### Resources

- Tutorial ([link](https://www.digitalocean.com/community/tutorials/how-to-debug-javascript-with-google-chrome-devtools-and-visual-studio-code))

### Demo

### Webstorm Debugger

Run > Edit Configurations

![](./images/webstorm-setup1.jpg)

### Webstorm Debugger

Set up a new debug run configuration

![](./images/webstorm-setup2.jpg)

### Webstorm Debugger

Provide the URL of your app

![](./images/webstorm-setup3.jpg)

### Webstorm Debugger

![](./images/webstorm-setup4.jpg)

### Webstorm Debugger

- Tutorial ([link](https://www.jetbrains.com/help/webstorm/debugging-javascript-in-chrome.html#debugging_js_on_built_in_server_example))

### Resources

Google Chrome DevTools is constantly under development.

Keep an eye on their Web Updates ([link](https://developers.google.com/web/updates/2021)).

### Exercise

#. Go to http://localhost:3000/js/debugging/debugging.html

#. Open `src/www/js/debugging/debugging.js`
