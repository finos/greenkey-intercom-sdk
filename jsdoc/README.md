## JSDoc

### Reference

We generate our SDK documentation automatically with [jsdocs](http://usejsdoc.org/).

### Generating docs

To generate documentation, local dependency management via a global [yarn](https://www.npmjs.com/package/yarn) install is required:
```bash
npm install -g yarn
```

Verify yarn is on your PATH:
```bash
which yarn
yarn -v
```

Install local dependencies from repo root:
```bash
yarn
```

Run the following command to build the docs and open your browser to the assets.
```bash
yarn docs
````

### Home Page

The [`docHomePage.md`](docHomePage.md) will be the first page of the generated documentation, so put general information for wouldbe sdk users here.

### Tutorial Pages

To make a tutorial page, create a markdown file and put it into the [`tutorials/`](tutorials/) folder. Then, you will need to add the file entry to the [`tutorials/tutorial.json`](tutorials/tutorial.json) for it to show up in the generated output.[\[1\]](http://usejsdoc.org/about-tutorials.html)

You can link to a tutorial page in the inline jsdocs comments with the following syntax.
```
/**
* @tutorial tutorialName
*/
```
In the above example, 'tutorialName' is the name of the file in the tutorial folder, without the .md extension. This will provide a link to the tutorial in the generated docs for the commented function.
