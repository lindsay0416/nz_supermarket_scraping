var Word = function (word, document, documents, targetKey) {
  this.word = word;
  this.document = document;
  this.documents = documents;
  this.targetKey = targetKey;

  this.occurrencesInDocument = this._getOccurencesInDocument();
  this.uniqueOccurrencesInDocuments = this._getUniqueOccurencesInDocuments();

  // get the inverse document frequency by dividing
  // the occurrencesInDocument by the uniqueOccurrencesInDocuments
  if (this.occurrencesInDocument === 0 || this.uniqueOccurrencesInDocuments === 0) {
    this.inversDocumentFrequency = 0;
  } else {
    this.inversDocumentFrequency = this.occurrencesInDocument / this.uniqueOccurrencesInDocuments;
  }
};

/**
 * Gets the number of occurrences of the loaded word string in the current document
 * @returns {Number}
 * @private
 */
Word.prototype._getOccurencesInDocument = function () {
  return (this.document[this.targetKey].match(new RegExp(this.word, 'ig')) || []).length;
};

/**
 * Gets the number of unique occurrences of the loaded word in all documents
 * @returns {Number}
 * @private
 */
Word.prototype._getUniqueOccurencesInDocuments = function () {
  return this.documents.reduce(function (count, doc) {
    if ((doc[this.targetKey].match(new RegExp(this.word, 'i')) || []).length > 0) {
      count++;
    }
    return count;
  }.bind(this), 0);
};

module.exports = Word;
