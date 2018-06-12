# GreenKey SDK

[![Maintainability](https://api.codeclimate.com/v1/badges/01ee726a50dddf3596fb/maintainability)](https://codeclimate.com/github/finos-voice/greenkey-sdk/maintainability)

<img src="https://github.com/finos-voice/greenkey-sdk/raw/master/logo/greenkey-logo.png" width="100" />

---

The GreenKey SDK is the easiest way to embed instant intercom communication into your application.
With minimal setup,
your app can have push-to-talk technology,
providing your users a fast, convenient way
to collaborate with colleagues.

## Getting Started

To install the GreenKey Intercom SDK for your own application, check out the installation notes
Once installed, you can start building by exploring the SDK documentation, examples, and tutorials.

## Installation

Before proceeding, please ensure that you have a recent version of node installed.
You will also need a package manager like npm or yarn installed as well.

1. Obtain a copy of the GreenKey SDK from its [GitHub repository](https://github.com/finos-voice/greenkey-sdk) inside the FinOS project.
2. Obtain an API key from GreenKey by emailing your request to <mailto:sdk@greenkeytech.com>
3. Add the SDK as a dependency in your project. Initialize your project if you have not already.

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

You are now ready to begin using the GreenKey SDK!

## Obtaining Access To Your Server

Before the SDK will work,
you will need to point it toward a URL endpoint
that has been approved for your use by GreenKey.
You will receive this with your API key.
This endpoint will be used as the main argument for instantiating the GreenKey class in the SDK.
See the example projects for the constants to set accordingly.

## Generating The Docs

The docs for the SDK may be manually generated. [Follow these easy instructions to generate your own docs](jsdoc/README.md).

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
