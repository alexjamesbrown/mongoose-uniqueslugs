
var mongoose = require('mongoose')
, should = require('should')
, Schema = mongoose.Schema
, mongooseUniqueSlugs = require('..')

describe('mongoose-slug', function () {

    before(function () {
        mongoose.connect('mongodb://localhost/mongoose-uniqueslugs-test');
    });

    afterEach(function (done) {
        mongoose.model('Artist').remove({}, done);
    });

    it('should create the slug with default source property (title)', function (done) {

        var schema = new Schema({ title: String, baz: String });
        mongooseUniqueSlugs.enhanceSchema(schema);

        var Artist = mongoose.model('Artist', schema);
        mongooseUniqueSlugs.enhanceModel(Artist);

        new Artist({ title: 'some artist' })
		.save(function (err, doc) {
		    if (err) return done(err);
		    doc.title.should.eql('some artist');
		    doc.slug.should.eql('some-artist');
		    done();
		});
    });
});