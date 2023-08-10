var Word = require('./word');

var Term = function (words, document, documents, targetKey) {
  this.words = words.split(' ').map(function (word) {
    return new Word(word, document, documents, targetKey);
  });

  this.inversDocumentFrequency = this.words.reduce(function (count, word) {
    return count + word.inversDocumentFrequency;
  }, 0);

  this.term = words;
};

module.exports = Term;
