This function takes an object as an argument, with the key "passphrase." 
```javascript
try {
   const userCreation = await GK.createUser({ passphrase: '1234' });
   // handle returned userCreation object...
} catch (e) {
   // handle error...
}
```

The function will return a promise that will resolve a user object with an id and a voice_token on success, and will reject if there is an error.
```javascript
// example object returned by createUser() on successful resolution
{ 
   created: "2018-02-13T19:23:53.916Z",
   id: "30d628d5-934b-4393-825e-dc21c907d44d",
   organization: null,
   updated: "2018-02-13T19:23:53.916Z",
   voice_token: "5gFP7JWP4v2XDYjEYGaoO0AxnRwQw54K"
}
```
