This function takes an object of configuration options as an argument. The function will resolve the intercom audio stream on success, or reject if there is an error.

This function does not actually start an intercom with another user, it merely connects the user to the audio stream so that they can then create an intercom with [`createIntercom()`](/tutorial-createIntercom.html).

```javascript
const endpoint = 'example.com';
const voiceToken = '5gFP7JWP4v2XDYjEYGaoO0AxnRwQw54K';

const config = {
  endpoint,
  id: voiceToken,
  protocol: 'wss',
  port: 80,
});

try {
    const intercomStream = await GK.connectIntercoms(config);
   // handle intercom stream
} catch (e) {
   // handle error...
}
```

See the tutorial "[Creating Your First Intercom](/tutorial-creatingAnIntercom.html)" for more about handling the returned audio stream.
