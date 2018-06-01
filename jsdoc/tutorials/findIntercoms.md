This function is used to retrieve a list of past and current intercoms. It returns a promise that will resolve to an object of intercoms.

```javascript
try {
  const intercoms = await GK.findIntercoms();
  // handle intercoms object...
} catch (e) {
  // handle error...
}
```

The default number of intercoms that will be returned is set to 100.

```javascript
// example object returned by findIntercoms
{
  total: 23,
  limit: 100,
  skip: 0,
  data: [
    {
      id: "1f1d6ad4-373f-4261-ae38-371317e3bbfb",
      created: "2017-12-29T22:46:16.013Z",
      initiator: "9176bf43-13eb-457d-ae52-a744b675111c",
      live: false,
      targets: ["89470e20-9f49-48a9-99f1-4f4926310c34"],
      updated: "2017-12-29T22:46:20.437Z"
    },
    {
      id: "3b226359-0115-4ff9-81c4-c626bd6ffb98",
      created: "2017-12-29T22:46:21.533Z",
      initiator: "9176bf43-13eb-457d-ae52-a744b675111c",
      live: true,
      targets: ["89470e20-9f49-48a9-99f1-4f4926310c34"],
      updated: "2017-12-29T22:46:22.986Z"
    },
    // etc...
  ],
}
```
