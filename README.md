# GreenKey SDK
> Voice-enable your front-end apps with instant intercoms

[![Maintainability](https://api.codeclimate.com/v1/badges/01ee726a50dddf3596fb/maintainability)](https://codeclimate.com/github/finos-voice/greenkey-sdk/maintainability)

<img src="https://github.com/finos-voice/greenkey-sdk/raw/master/logo/greenkey-logo.png" width="100" />

---

The GreenKey SDK
is the easiest way to embed instant intercom communication into your application.
With minimal setup,
your app can have push-to-talk technology,
providing your users a fast, convenient way
to collaborate with colleagues in your community.

This SDK provides front-end libraries and components
which leverage the GreenKey telephony backend.

The GreenKey SDK
is hosted by the [Voice Program] of the Fintech Open Source Foundation ([FINOS]).
If you are a company interested in the evolution of
open standards, interoperability, and innovation in the financial services sector,
please consider joining FINOS.

## Getting started

### Prerequisites

- A recent version of node installed
- A Node package manager (i.e. npm or yarn)
- An API key: obtain a GreenKey API key by emailing your request to <mailto:sdk@greenkeytech.com>

### Installing

`npm init` or `yarn init`

In the `package.json` file for your project, list the SDK as a dependency, and then point it to the path of the SDK location on your computer, like so:

```json
  "dependencies": {
    "greenkey-sdk": "file:../sdk"
  },
```

Then, from the top level directory of your project, run a command to install your dependencies.

`npm install` or `yarn `

After that, the `greenkey-sdk` should be added to your project's `node_modules/` folder.

Before the SDK will work,
you will need to point it toward a URL endpoint
that has been approved for your use by GreenKey.
You will receive this with your API key.
This endpoint will be used as the main argument for instantiating
the GreenKey class in the SDK.

See the [example projects](examples/) for the constants to set accordingly.

You are now ready to begin using the GreenKey SDK!

## Learning

Once installed, you can start building by exploring
the SDK documentation, examples, and tutorials.

You may generate the documentation by following [these easy instructions](jsdoc/README.md).

## Using the SDK

For a tutorial on getting started,
check out "Creating An Intercom" in the docs.
Feel free to check out the rest of the docs
for an explanation of the various functions contained therein.

Other great resources are the [sdk examples](examples/)
which use the SDK in simple, functional web pages with intercoms.

## Contributing

### Code of Conduct

Please make sure you read and observe our [Code of Conduct].

### Pull Request process

1. Fork it
1. Create your feature branch (`git checkout -b feature/fooBar`)
1. Commit your changes (`git commit -am 'Add some fooBar'`)
1. Push to the branch (`git push origin feature/fooBar`)
1. Create a new Pull Request

## Versioning

We use [SemVer] for versioning.  For the versions available, see the [tags on this repository].

## Authors

Original authors:

- [Patrick Kuca](https://github.com/pkuca)
- [Rochad Tlusty](https://github.com/rochadt)
- [Ashley Shultz](https://github.com/AGiantSquid)

For all others who have aided this project, please see the [list of contributors].

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.

<!-- Markdown link & img defs -->
[FINOS]: https://www.finos.org
[Code of Conduct]: https://www.finos.org/code-of-conduct
[Voice Program]: https://finosfoundation.atlassian.net/wiki/spaces/VOICE/overview
[SemVer]: http://semver.org
[list of contributors]: https://github.com/finos-voice/greenkey-sdk/graphs/contributors
[tags on this repository]: https://github.com/finos-voice/greenkey-sdk/tags
