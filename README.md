# npm-install-search-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/npm-install-search-cli.svg)](https://greenkeeper.io/)

![alt-text](https://media.giphy.com/media/1akH8ZffIwX1XcIwWt/giphy.gif)

## Installation

```bash
npm install npm-install-search-cli -g
```

## Usage

```bash
nis [...options]
```

You can just execute `nis` with [the current `npm` `options`](https://docs.npmjs.com/cli/install) like `--save` or `--save-dev` or `--save-prod`.

You'll be prompted to search `npm` packages using an autocomplete interface.

![alt-text](https://imgur.com/hSRpcfT.png)

(Under the hood, the CLI is making HTTP requests to [the `npm` registry's `search` API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search)).

Once you make a selection, it should install like good 'ol `npm install`!

![alt-text](https://imgur.com/ijG0lBQ.png)
