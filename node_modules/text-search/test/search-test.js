require('assert');
var should = require('should');

describe('Search', function() {

  var Search = require('../src/search'),
      searchInstance;

  beforeEach(function() {
    searchInstance = new Search;
  });

  describe('sortByScore', function () {
    it('should sort the terms in order of relevancy score', function () {
      var documents = searchInstance.sortByScore('my horse', [
        {text: 'my fancy horse'},
        {text: 'my my my my'},
        {text: 'horse horse horse horse'},
        {text: 'horses are fancy my horse is particularly great, i love my horse'},
        {text: 'My Horse heralds a new generation of cloud-based social gaming on iOS. Care for your horse through grooming, treating and feeding. Equip it with professional saddles and tack before heading out to compete. Build a bond with your realistic horse through performing a wide range of interactive 3D activities and, when you’re ready, there are 8 different breeds to collect and look after!'}
      ], 'text');

      should(documents[0].text).be.exactly('horses are fancy my horse is particularly great, i love my horse');
    });

    it('should work with partial word matches', function () {
      var documents = searchInstance.sortByScore('Hor part herald', [
        {text: 'my fancy horse'},
        {text: 'my my my my'},
        {text: 'horse horse horse horse'},
        {text: 'horses are fancy my horse is particularly great, i love my horse'},
        {text: 'My Horse heralds a new generation of cloud-based social gaming on iOS. Care for your horse through grooming, treating and feeding. Equip it with professional saddles and tack before heading out to compete. Build a bond with your realistic horse through performing a wide range of interactive 3D activities and, when you’re ready, there are 8 different breeds to collect and look after!'}
      ], 'text');

      should(documents[0].text).be.exactly('horses are fancy my horse is particularly great, i love my horse');
    });

    it('should sort the first matching document to the top for a duplicate term', function () {

      var searchDocuments = [
        {text: 'Custom Keyboard Progress'},
        {text: 'Custom Keyboard Resources'},
        {text: 'Serial Improvement'},
        {text: 'Development'},
        {text: 'Gaming Discussions'},
        {text: 'Favourite Games'},
        {text: 'Music'},
        {text: 'Favourite Videos'},
        {text: 'Age of Plenty'},
        {text: 'Cool Tech'},
        {text: 'Cool Github Repos'},
        {text: 'Funny Things'},
        {text: 'Technology'},
        {text: 'Polymer'}
      ];

      var documents = searchInstance.sortByScore('custom', searchDocuments, 'text');
      should(documents[0].text).be.exactly('Custom Keyboard Progress');

      var documents = searchInstance.sortByScore('cool', searchDocuments, 'text');
      should(documents[0].text).be.exactly('Cool Tech');

      var documents = searchInstance.sortByScore('tech', searchDocuments, 'text');
      should(documents[0].text).be.exactly('Cool Tech');
    });

    it('will filter non matching elements', function () {

      var searchDocuments = [
        {text: 'Custom Keyboard Progress'},
        {text: 'Custom Keyboard Resources'},
        {text: 'Serial Improvement'},
        {text: 'Development'},
        {text: 'Gaming Discussions'},
        {text: 'Favourite Games'},
        {text: 'Music'},
        {text: 'Favourite Videos'},
        {text: 'Age of Plenty'},
        {text: 'Cool Tech'},
        {text: 'Cool Github Repos'},
        {text: 'Funny Things'},
        {text: 'Technology'},
        {text: 'Polymer'}
      ];

      searchInstance = new Search({filter_non_matching: true});
      var documents = searchInstance.sortByScore('custom', searchDocuments, 'text');
      should(documents.length).be.exactly(2);
    });
  });
});
