## Websockets

### Typical HTTPS requests

- Request / response cycle
- Always initiated by the client
- Server can only respond once

### Typical HTTPS requests

![](./images/request-response.png)

### Getting updates from server

- Polling
- "Long polling"
- Websockets

### Websockets

- Upgrades regular TCP connection to "duplex"
- Creates a two-way communication channel
- Each sends messages whenever they want
- Not subject to CORS

### Security

- Encrypt traffic and confirm identity
- Never execute foreign JS

### Websockets (client)

```javascript
const ws = new WebSocket('ws://localhost:3030/')

// connection opened
ws.onopen = () => {}

// connection closed
ws.onclose = () => {}

// error occured
ws.onerror = () => {}

// message received
ws.onmessage = ({ data }) => {}

// send message
ws.send('PING')

// close connection
ws.close()
```

### Websockets (server)

```javascript
// `ws` is a popular implementation of websockets
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3030 })

// new connection received
wss.on('connection', (ws, req) => {
  // send message
  ws.send('Welcome!')
  
  // on disconnect
  ws.on('close', () => {})
})
```

### Demo

- Visit http://localhost:3000/js/apis/websockets/demo/

### Exercise




