# npm-install-search-cli

[![npm](https://img.shields.io/npm/v/npm-install-search-cli.svg)](https://www.npmjs.com/package/npm-install-search-cli)
[![npm](https://img.shields.io/npm/dt/npm-install-search-cli.svg)](https://www.npmjs.com/package/npm-install-search-cli)

![alt-text](https://media.giphy.com/media/1akH8ZffIwX1XcIwWt/giphy.gif)

## Installation

```bash
npm install npm-install-search-cli -g
// or
yarn add npm-install-search-cli -g
```

## Usage

### `npm install` + `search`

```bash
nis [...options]
```

### `yarn add` + `search`

```bash
yas [...options]
```

If you use `npm` for package management, you can execute `nis` with some of [the current `npm install` `options`](https://docs.npmjs.com/cli/install) like `--save` or `--save-dev` or `--save-prod`. <sup>[1](#npm-options-footnote)</sup>

If you use `yarn` for package management, you can execute `yas` with all of [the current `yarn add` `options`](https://yarnpkg.com/en/docs/cli/add) like `--dev` or `-E`.

You'll be prompted to search packages in the `npm` registy using an autocomplete interface.

![alt-text](https://imgur.com/hSRpcfT.png)

(Under the hood, the CLI is making HTTP requests to [the `npm` registry's `search` API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search)).

Once you make a selection, it should install like good 'ol `npm install` or `yarn add`!

![alt-text](https://imgur.com/ijG0lBQ.png)

<a name="npm-options-footnote">1</a>: The current options are `-S` / `--save`, `-P` / `--save-prod`, `-D` / `--save-dev`, `-O` / `--save-optional`, `-E` / `--save-exact`, `-B` / `--save-bundle`, `-g`, / `--global`, `--no-save`, and `--dry-run`. While not the complete list of options available via `npm install`, I find these options represent `99%` of my usecases - feel free to open a PR if you want to add more options!
