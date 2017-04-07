// grab the things we need
var mongoose = require('mongoose');
//var textSearch = require('mongoose-text-search');

// create a schema
var twitSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	created_at: Date,
	text: String,
	data: String,
});

// the schema is useless so far
// we need to create a model using it
var Twit = mongoose.model('Tweets', twitSchema);

// make this available to our users in our Node applications
module.exports = Twit;
