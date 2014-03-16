/*

This is a simply twitter stream app

Requires modules:

ntwitter
mongodb

Saves data to 'twitterstream' database collection 'rawtweetdata'

database value format:
tweet
created_at
url
hashtags
retweet_count
username
favourites_count
language
followers_count
*/

var twitter = require('ntwitter');
var settings = require('./twitter-stream-settings.js');
var t = new twitter({
    consumer_key: settings.consumer_key,
    consumer_secret: settings.consumer_secret,
    access_token_key: settings.access_token_key,
    access_token_secret: settings.access_token_secret
});

var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    assert = require('assert')
    BSON = mongo.BSONPure;

/*
var tagFilter = ['kokoomus', 
                   'vasemmisto', 
                   '#RKP', 
                   '#keskusta', 
                   'alexstubb', 
                   'arhinmaki',
                   'haglund',
                   'soini',
                   'SDP',
                   'niinisto',
                   'politiikka',
                   'eurovaalit',
                   'vaalit'];
*/

 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitterstream', server);



// open db
db.open(function(err, db) {
  assert.equal(null, err);

  if (settings.useUserFilter == 'TRUE') {
 
    t.stream('statuses/filter', { follow: settings.userFilter },function(stream) {
		  stream.on('data', function(tweet) {
            db.collection('rawtweetdata', function(err, collection) {
               collection.insert({'tweet': tweet.text,
               					  'created_at': tweet.created_at,
               					  'url': tweet.entities.urls.url,
               					  'hashtags': tweet.entities.hashtags,
               					  'retweet_count': tweet.retweet_count,
               					  'username': tweet.user.name,
               					  'favourites_count': tweet.user.favourites_count,
               					  'language': tweet.user.lang,
               					  'followers_count': tweet.user.followers_count,
                          //These attributes are for this website, where published indicates status
                          'published': 'FALSE',
                          'likes': 0});
            });
        });
    }
    );
  }
  else {
    t.stream('statuses/filter', { track: settings.tagFilter },function(stream) {
      stream.on('data', function(tweet) {
            db.collection('rawtweetdata', function(err, collection) {
               collection.insert({'tweet': tweet.text,
                          'created_at': tweet.created_at,
                          'url': tweet.entities.urls.url,
                          'hashtags': tweet.entities.hashtags,
                          'retweet_count': tweet.retweet_count,
                          'username': tweet.user.name,
                          'favourites_count': tweet.user.favourites_count,
                          'language': tweet.user.lang,
                          'followers_count': tweet.user.followers_count,
                          //These attributes are for this website, where published indicates status
                          'published': 'FALSE',
                          'likes': 0});
            });
        });
    }
    );

  }
});
