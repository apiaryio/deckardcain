# Deckard Cain

[![Build Status](https://travis-ci.org/apiaryio/deckardcain.svg?branch=master)](https://travis-ci.org/apiaryio/deckardcain)

[*"As a token of my gratitude, I will identify items for you at no charge."*](https://www.youtube.com/watch?v=TEMCYmIYouE)

## Introduction

Deckard Cain library identifies (media) type of API description files.

### Supported API description formats

- [API Blueprint](https://apiblueprint.org/) - `text/vnd.apiblueprint`
- Legacy Apiary Blueprint (predecessor of API Blueprint) - `text/vnd.legacyblueprint`
- Swagger - `application/swagger+json` (according to [swagger-api/swagger-spec#110](https://github.com/swagger-api/swagger-spec/issues/110)) and `application/swagger+yaml`
- [API Description Namespace](https://github.com/refractproject/refract-spec/blob/master/namespaces/api-description-namespace.md) - `application/vnd.refract.api-description+json` and `application/vnd.refract.api-description+yaml`

## Install

```
npm install deckardcain
```

## Usage

```javascript
import {identify} from 'deckardcain';

identify(`
HOST: http://example.com

--- API Name ---

All Messages
GET /messages
< 200
`) // 'text/vnd.legacyblueprint'

identify(`
FORMAT: 1A
HOST: http://example.com

# API Name

## Group Messages

### All Messages [/messages]

#### Read [GET]

+ Response 200 (text/plain)
`) // 'text/vnd.apiblueprint'
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

Source code is located in the `./src` folder and gets automatically transpiled into `./lib` folder when `npm install` or `npm publish` is invoked. However, should you need to transpile it manually, use `npm run compile`.

## Name

Deckard Cain library pays tribute to a fictional character from [Diablo video game series](https://en.wikipedia.org/wiki/Diablo_%28series%29). In Diablo II, [Deckard Cain](https://en.wikipedia.org/wiki/Characters_of_Diablo#Deckard_Cain) provides his wisdom and **identifies items for free** after being rescued by the player.
