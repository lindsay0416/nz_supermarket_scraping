var Term = require('./term');
var Document = function (words, document, documents, targetKey) {
  this.document = document;
  this.term = new Term(words, document, documents, targetKey);
};

module.exports = Document;