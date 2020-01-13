# GreenKey Intercom SDK Example - Vue.js 2.0

This repository contains an example of using the Vue 2.0 framework to communicate with the GreenKey Voice backend.

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
cd examples/vue
yarn
```

Retrieve the public endpoint by [contacting GreenKey](http://greenkeytech.com/contact-us), then add your given endpoint URL to line 37 of `GreenKeyComponent.vue` (located in `greenkey-intercom-sdk/examples/vue/src/components/GreenKeyComponent.vue`:
```javascript
const endpoint = 'some-endpoint.greenkeytech.com';
```

Launch the dev server on localhost:8080 and start your browser:
```bash
yarn dev
```

### Production Use

``` bash
# build for production with minification
yarn run build
```

For a detailed explanation on how Vue.js with webpack works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
