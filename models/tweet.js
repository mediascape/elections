// grab the things we need
var mongoose = require('mongoose');

// create a schema
var tweetSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	created_at: Date,
	text: String,
	data: String,
});

tweetSchema.index({data:1,created_at:-1});

// the schema is useless so far
// we need to create a model using it
var Tweet = mongoose.model('Tweets', tweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;
