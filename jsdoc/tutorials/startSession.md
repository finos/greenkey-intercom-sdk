This function takes an object as an argument, with the keys "apiKey", "id", and "passphrase".
```javascript
try {
  const apiKey = 'fce881ec-e952-43cd-b823-376e20f87ef5';
  const id = '8610e80a-8359-4734-9fa9-9d89002fddd8';
  const passphrase = 'secret'
  const login = await GK.startSession({ apiKey, id, passphrase });
  // handle returned login object...
} catch (e) {
  // handle error...
}
```

The function will return a promise that will resolve with an authorization payload object on success, and will reject if there is an error.
```javascript
// example of object returned by startSession()
{
  accessToken: "pjJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1NWI5NmU2MC1kOWQzLTRlNzQtYWQ5OS0wOTRiZmRiMjNlMGYiLCJpYXQiOjE1MTU3NzI3OTMsImV4cCI6MTUxNTg1OTE5MywiYXVkIjoiaHR0cHM6Ly9ncmVlbmtleXRlY2guY29tIiwiaXNzIjoiZ3JlZW5rZXkiLCJzdWIiOiJncmVlbmtleSIsImp0aSI6ImJhZTcxZmIwLWEwZWQtNDU4OS05Y2NlLWEyYjJjY2I3MTUxMyJ9.fm3kjLwWbc7Lm-lO0R8GPet8FAPqHbZd4rlwjiUK_or",
  voice_token: "0etBy9GjPzD6iSGEorjXOAzm7wRusOCa"
}
```
