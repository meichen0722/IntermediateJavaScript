TODO where does this live?

### State

```javascript
class AppMailer {
  removeInvalidAddresses() {
    for (let i in this.addresses) {
      if (!this.addresses[i].match(/@/)) {
        this.addresses.splice(i, 1)
      }
    }
  }

  sendEmail({ from, to }) {
    this.addresses = to
    this.emailer.setSender(from)
    this.removeInvalidAddresses()
    this.emailer.setRecipients(this.addresses)
    this.emailer.send()
  }
}
```

### State

```javascript
class AppMailer {
  sendEmail({ from, to }) {
    
  }
}
```
