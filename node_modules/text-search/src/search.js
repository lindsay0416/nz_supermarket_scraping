var Document = require('./document');

var Search = function(options) {
  this.options = options || {};
  this.lastMatchedDocuments = [];
};

Search.prototype.sortByScore = function (searchTerm, documents, targetKey) {

  if (searchTerm.length === 0) {
    return documents;
  }

  var scored = documents.map(function (doc) {
    return new Document(searchTerm, doc, documents, targetKey);
  });

  // sort by inversDocumentFrequency
  scored.sort(function (a, b) {
    var idfA = a.term.inversDocumentFrequency;
    var idfB = b.term.inversDocumentFrequency;

    if (idfA > idfB) {
      return -1;
    } else if (idfA < idfB) {
      return 1;
    }

    return 0;
  });

  if (this._getOpt('filter_non_matching')) {
    scored = scored.filter(function (doc) {
      return doc.term.inversDocumentFrequency > 0
    });
  }

  this.lastMatchedDocuments = scored;

  scored = scored.map(function (doc) {
    return doc.document;
  });

  return scored;
};

/**
 * Gets the provided option
 * @param opt
 * @returns {*|null} The options value or null when not found
 * @private
 */
Search.prototype._getOpt = function (opt) {
  if (this.options.hasOwnProperty(opt)) {
    return this.options[opt];
  } else {
    return null;
  }
};

module.exports = Search;
