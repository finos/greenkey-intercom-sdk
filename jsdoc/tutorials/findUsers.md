This function is used to retrieve a list of all the users. It returns a promise that will resolve to an object of users.
```javascript
try {
  const results = await GK.findUsers();
  // handle results...
} catch (e) {
  // handle error...
}
```

The default number of users that will be returned is set to 100.
```javascript
// example object returned by findUsers()
{
  total: 30,
  limit: 100,
  skip: 0,
  data: [
    {
      id: "1176bf43-13eb-457d-ae52-a744b675111c",
      organization: "1d9b0526-1ece-4abd-b1b9-d47c26bb8862",
      created: "2017-12-29T22:44:51.104Z",
      updated: "2017-12-29T22:44:51.104Z",
      voice_token: "kkhUC4WkDAUbF2u4lBuu2KzmoJQPSgiC"
    },
    {
      id: "29470e20-9f49-48a9-99f1-4f4926310c34",
      organization: "1d9b0526-1ece-4abd-b1b9-d47c26bb8862",
      created: "2017-12-29T22:44:52.269Z",
      updated: "2017-12-29T22:44:52.269Z",
      voice_token: "Utn41Ava2cMMgQMVfFTN5gh1hfEzagSl"
    },
    {
      id: "3fea510a-3ce6-48de-850c-b251d426118c",
      organization: "1d9b0526-1ece-4abd-b1b9-d47c26bb8862",
      created: "2017-12-29T22:44:53.312Z",
      updated: "2017-12-29T22:44:53.312Z",
      voice_token: "eEGtPxPFUhUn97CccZxmmSQbeJ43QxqW"
    },
    // etc...
  ]
}
```