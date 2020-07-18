## Composition

### Inheritance in React

* Creating component hierarchies with inheritance

[(link)](https://codesandbox.io/s/trusting-kare-srouj?file=/src/App.js)

### Composition in React

* Just like HTML elements, React components accept children
* Accessible as a prop called `children`
* It contains whatever was in between the open/close tags

```javascript
<List>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</List>

// the `children` of the List component is:
//  <li>One</li>
//  <li>Two</li>
//  <li>Three</li>
```

### They're Like Containers

```javascript
<ListGroup>
  <ListItem>A</ListItem>
  <ListItem>B</ListItem>
  <ListItem>C</ListItem>
</ListGroup>

<Modal>
  <ModalHeader>I am a modal</ModalHeader>
  <ModalBody>Here's the body!</ModalBody>
  <ModalFooter>Footer</ModalFooter>
</Modal>
```

### They're Like Containers

```javascript
<Block>
  <span>Hello world</span>
</Block>
<Block>
  <span>These are spaced out</span>
</Block>

<SpreadEvenly>
  <span>A</span>
  <span>B</span>
  <span>C</span>
</SpreadEvenly>
```

### Composition in React

Components simply use other components:

```javascript
const SuccessLabelWithIcon = ({ icon }) => (
  <SuccessLabel>{this.props.children}{icon}</SuccessLabel>
)
```

[(link)](https://codesandbox.io/s/magical-satoshi-dsq97?file=/src/App.js)

### Creating "Slots"

```javascript
const SplitPane = ({ left, right }) => (
  <div className="SplitPane">
    <div className="SplitPane-left">
      {left}
    </div>
    <div className="SplitPane-right">
      {right}
    </div>
  </div>
)

const App = () => (
  <SplitPane
    left={<Contacts />}
    right={<Chat />}
  />
)
```

### Exercise

**Exercise**: [(link)](https://codesandbox.io/s/hungry-keller-4v8zi?file=/src/styles.scss)

<div class="notes">
Still figuring this one out: [(link)](https://codesandbox.io/s/angry-hooks-40rd4?file=/src/App.js)
</div>
