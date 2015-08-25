# Deckard Cain

*"As a token of my gratitude, I will identify items for you at no charge."*

## Introduction

Deckard Cain library identifies (media) type of API description files.

### Supported API desctiption formats

- [API Blueprint](https://apiblueprint.org/) - `text/vnd.apiblueprint`
- Apiary Blueprint (predecessor of API Blueprint) - `text/vnd.apiaryblueprint`

## Install

```
npm install deckardcain
```

## Basic Usage

```javascript
const dc = require('deckardcain')

dc.identify(`
HOST: http://example.com

--- API Name ---

All Messages
GET /messages
< 200
`) // 'text/vnd.apiaryblueprint

dc.identify(`
FORMAT: 1A
HOST: http://example.com

# API Name

## Group Messages

### All Messages [/messages]

#### Read [GET]

+ Response 200 (text/plain)
`) // 'text/vnd.apiblueprint'
```

## Documentation

### identify (function)

```javascript
/**
 * Identifies given source.
 * @param {string} source - The source code of API description file.
 * @returns {string|null} Media type of given file.
 */
deckardcain.identify(source)
```

## Contribute

Please mind the library is written in ECMAScript 6.

### Installation

```
git clone https://github.com/apiaryio/deckardcain
cd deckardcain
npm install
```

### Testing

```
npm test
```

See also the `.travis.yml` file.

### Workflow

Source code is located in the `./src` folder and gets automatically transpiled into `./lib` folder when `npm install`, `npm test` or `npm publish` is invoked. However, should you need to transpile it manually, use `npm run compile`.

## Name

Deckard Cain library pays tribute to a fictional character from [Diablo video game series](https://en.wikipedia.org/wiki/Diablo_%28series%29). In Diablo II, [Deckard Cain](https://en.wikipedia.org/wiki/Characters_of_Diablo#Deckard_Cain) provides his wisdom and **identifies items for free** after being rescued by the player.
