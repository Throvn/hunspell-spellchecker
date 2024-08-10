# Hunspell Spellchecker in Javascript

[![Build Status](https://travis-ci.org/GitbookIO/hunspell-spellchecker.png?branch=master)](https://travis-ci.org/GitbookIO/hunspell-spellchecker)
[![NPM version](https://badge.fury.io/js/hunspell-spellchecker.svg)](http://badge.fury.io/js/hunspell-spellchecker)

A lightweight spellchecker written in Javascript, it can be used ~~in Node.JS and~~ in **the browser**. It has been build to be pre-parse Hunspell dictionary to JSON.

### Installation

> [!IMPORTANT]
> This fork is only compatible in a browser environment by choice.
> See in `lib/example.html` on how to use this library for a complete minimal example and with a Web Worker.

### API

Initialize a spellchecker instance:

```js
const spellchecker = new Spellchecker();
```

Parse and serialize a dictionary

```js
// There are more performant ways on how to do this (see example.html).
// Parse an hunspell dictionary that can be serialized as JSON
const DICT = spellchecker.parse({
  aff: await (await fetch("./en_EN.aff")).text(),
  dic: await (await fetch("./en_EN.dic")).text(),
});
```

Load a serialized dictionary

```js
// Load a dictionary
spellchecker.use(DICT);
```

Check a word:

```js
// Check a word
var isRight = spellchecker.check("tll");

// Get suggestions
var sug = spellchecker.suggest("tll");
```
