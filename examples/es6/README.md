# GreenKey Public SDK Example - Vanilla ES6

This repository contains an example of using Vanilla ES6 to communicate with the GreenKey Voice backend.

## Quick Start

### Setup Environment

This project handles dependencies and package scripts with [yarn](https://www.npmjs.com/package/yarn):
```bash
npm install -g yarn
```

Verify yarn is on your PATH:
```bash
which yarn
yarn -v
```

Clone the repository, then install local dependencies from the root:
```bash
cd examples/es6
yarn
```

Retrieve the public endpoint by [contacting GreenKey](http://greenkeytech.com/contact-us), then add your given endpoint URL to line 5 of app.js:
```javascript
const endpoint = 'some-endpoint.greenkeytech.com';
```

Launch the dev server and your browser:
```bash
yarn dev
```

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
