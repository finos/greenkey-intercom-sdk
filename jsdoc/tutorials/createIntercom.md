This function takes an object as an argument, with the key "targets" corresponding to an array of intercom UUIDs.
```javascript
try {
	const intercom = { targets: ["2176bf43-13eb-457d-ae52-a744b675111c"] };
	const newIntercom = await GK.createIntercom(intercom);
	// handle newIntecom object...
} catch (e) {
	// handle error...
}
```

The function will return a promise that will resolve an intercom object on success, and will reject if there is an error.
```javascript
{
	id: "1f1d6ad4-373f-4261-ae38-371317e3bbfb",
	created: "2017-12-29T22:46:16.013Z",
	initiator: "25b96e60-d9d3-4e74-ad99-094bfdb23e0f",
	live: true,
	targets: ["2176bf43-13eb-457d-ae52-a744b675111c"],
	updated: "2017-12-29T22:46:20.437Z"
}
```