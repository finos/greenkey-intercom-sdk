After installing `greenkey-sdk.js` in your project, import it like any other module.

```javascript
import GreenKey from 'greenkey-sdk';
```

Then you can initialize it with the target endpoint.
```javascript
const endpoint = 'example.com';
const GK = new GreenKey(`https://${endpoint}`);
```
