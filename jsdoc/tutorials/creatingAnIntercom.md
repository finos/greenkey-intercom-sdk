### Before You Begin

 To use The GreenKey SDK, you will need an API key for your account. [Contact a GreenKey administrator](http://greenkeytech.com/contact-us/) to obtain an API key for your development if you have not done so already. 

### Initializing

After installing `greenkey-sdk.js` in your project, import it like any other module.

```javascript
import GreenKey from 'greenkey-sdk';
```

Then you can initialize it with the target endpoint. The endpoint used for sandboxing is "`voice-sandbox.greenkeytech.com`".

```javascript
const endpoint = 'test.example.com';
const GK = new GreenKey(`https://${endpoint}`);
```

### User Creation

You must have multiple accounts created before you can begin using the intercom functionality of the GreenKey SDK. Let's create one now. All we need is a passphrase.

```javascript
// run the following in the body of an async function
try {
  const passphrase = '1234';
  const newUser = await GK.createUser({ passphrase });
  // handle newUser object...
} catch (e) {
  // handle error...
}
```

If the signup is valid, the function will return a new user object. 

```javascript
// example 'newUser' object
// newUser = { 
//    created: "2017-12-29T22:44:51.104Z",
//    id: "30d628d5-934b-4393-825e-dc21c907d44d",
//    organization: null,
//    updated: "2017-12-29T22:44:51.104Z",
//    voice_token: "5gFP7JWP4v2XDYjEYGaoO0AxnRwQw54O"
// }
```

This object contains the `id` of your new user. This `id` is randomly generated and not easily read by humans. You will want to associate this `id` with a username, email, and other useful information in your application logic.

### Logging in

Once you have the new user object, you are ready to start a session. Use the [`startSession()`](/tutorial-startSession.html) function with the API key you obtained from GreenKey, the password for your user, and the newly created `id` for your new user to log in and initialize a session.

```javascript
// run the following in the body of an async function
const apiKey = 'fce881ec-e952-43cd-b823-376e20f87ef5';
const login = await GK.startSession({ apiKey, id: newUser.id, passphrase });
```

If the login was successful, you will get a login object that contains a "`voice_token`". 

You are now ready to connect your intercom connection. The [`connectIntercoms()`](/tutorial-connectIntercoms.html) function requires a config object to create this connection. Use the `voice_token` that was returned from the [`startSession()`](/tutorial-startSession.html) function as the `id` for this object.

```javascript

const config = {
  endpoint,
  id: login.voice_token,
  protocol: 'wss',
  port: 80,
};

// run the following in the body of an async function
try {
  const intercomConnection = await GK.connectIntercoms(config);
  // handle success
catch (e) {
  // handle error...
}
```

In the above example, the `intercomConnection` will contain the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object for the intercom audio. You could handle this MediaStream object with JavaScript, or you can set it to an `<audio>` element for playback. Let's use the later method.

```html
<!-- add the following audio element to your html for the incoming audio -->
<audio id="remote" autoplay>
```
```javascript
// in your javascript file, set the srcObject to the intercomStream to make incoming intercoms audible
document.getElementById('remote').srcObject = intercomStream;
```

### Creating the Intercom

Once you have two or more users created, you can begin creating intercom communications between them. You will need the user `id` for any user you wish to intercom. One way you can obtain the `id` of a user is with the [`findUsers()`](/tutorial-findUsers.html) function. This function will return the top 100 users by default.

```javascript
// run the following in the body of an async function
try {
  const users = await GK.findUsers();
  // users.data = [
  //  {
  //    id: "1176bf43-13eb-457d-ae52-a744b675111c",
  //    organization: "1d9b0526-1ece-4abd-b1b9-d47c26bb8862",
  //    created: "2017-12-29T22:44:51.104Z",
  //    updated: "2017-12-29T22:44:51.104Z",
  //    voice_token: "kkhUC4WkDAUbF2u4lBuu2KzmoJQPSgiC"
  //  },
  //  {
  //    id: "29470e20-9f49-48a9-99f1-4f4926310c34",
  //    organization: "1d9b0526-1ece-4abd-b1b9-d47c26bb8862",
  //    created: "2017-12-29T22:44:52.269Z",
  //    updated: "2017-12-29T22:44:52.269Z",
  //    voice_token: "Utn41Ava2cMMgQMVfFTN5gh1hfEzagSl"
  //  }
  // ]
  // handle results...
} catch (e) {
  // handle error...
}
```

Both users must be logged in on two different machines for the connection to work. Once you have the ID of the user you would like to intercom, you can use the [`createIntercom()`](/tutorial-createIntercom.html) function. This function accepts an object, with a key of "`targets`", and a value that is an array of the user IDs that you wish to intercom.

```javascript
const targetUserId = "29470e20-9f49-48a9-99f1-4f4926310c34";
const intercom = { targets: [targetUserId] };

// run the following in the body of an async function
try {
  const liveIntercom = await GK.createIntercom(intercom);
  // handle liveIntercom...
} catch (e) {
  // handle error...
}
```

Creating an intercom is that easy!
