This function takes an intercom object as an argument.
```javascript
// A live intercom would have the following structure:
const liveIntercom = {
  id: "1f1d6ad4-373f-4261-ae38-371317e3bbfb",
  created: "2017-12-29T22:46:16.013Z",
  initiator: "25b96e60-d9d3-4e74-ad99-094bfdb23e0f",
  live: true,
  targets: ["2176bf43-13eb-457d-ae52-a744b675111c"],
  updated: "2017-12-29T22:46:20.437Z"
};

try {
	const stoppedIntercom = await GK.stopIntercom(liveIntercom);
	// handle stoppedIntercom result...
} catch (e) {
	// handle error...
}
```

The function will return a promise that will resolve an intercom object on success, and will reject if there is an error.
```javascript
// example intercom object returned by stopIntercom() on resolution
{
  id: "1f1d6ad4-373f-4261-ae38-371317e3bbfb",
  created: "2017-12-29T22:46:16.013Z",
  initiator: "25b96e60-d9d3-4e74-ad99-094bfdb23e0f",
  live: false,
  targets: ["2176bf43-13eb-457d-ae52-a744b675111c"],
  updated: "2017-12-29T22:46:25.437Z"
}
```
