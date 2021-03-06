var FeedParser = require('feedparser');
var request = require('request');
var fs = require('fs');

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('ReaderDB', new Server('localhost', 27017), { w: 1 });
var feedscollection = db.collection('feeds', { w: 1 });
var newscollection = db.collection('newscollection', {w: 1});

var parsedJSON = require('./feed-reader-server-settings.json');



feedReader = function() {
	//this.db.open(function(){});
}


/*
feedReader.insertFeeds = function(){


		this.feedscollection.drop();
		this.feedscollection.insert(parsedJSON.feed, function(error, records){
			if (error) throw error;
			console.log("Feeds added");
			//db.close();	
		});

}


*/
//Adding predefined feed sources from file to database
feedReader.insertFeeds = function(){
	db.open(function(error, db) {
		if (error) {console.dir(error); db.close();}
		feedscollection.drop();
		feedscollection.insert(parsedJSON.feed, function(error, records){
			if (error) throw error;
			console.log("Feeds added");
			db.close();	
		});
	});
}

//Read all feeds ans saves them to database
feedReader.readAllFeeds = function() {
	db.open(function(error, db) {
		console.log('here1');
		if (error) {console.dir(error);}

		feedscollection.count(function(error, count) {
			if (error) {console.dir(error);}

			for (var i = count - 1; i >= 0; i--) {
				var t;
				
				var cursor = i.toString();

				feedscollection.findOne({'id': cursor}, function(error, doc) {
					var lastFeedPubdate = doc.lastFeedPubdate;
					console.log(lastFeedPubdate);
					if (error) {console.dir(error);}
					var t=0;

					request(doc.url).pipe(new FeedParser())
						.on('error', function(error) {
							console.log(error);
							db.close();
						})
						.on('data', function(item) {
							if(t==0) {
								var latestFeedPubdateInThisRound = Date.parse(item.pubdate);
								console.log(latestFeedPubdateInThisRound);
								t++;
								console.log('t++');
							}
							if(Date.parse(item.pubdate) > lastFeedPubdate) {
								console.log(item.title);
								newscollection.save({'title': item.title,
													'summary': item.summary,
													'description': item.description,
													'url': item.link,
													'pubdate': item.pubdate,
													'image': item.image,
													'categories': item.categories},
													function(error, doc){});
							}
							console.log('doing update');
							//console.log(latestFeedPubdateInThisRound);

							feedscollection.update({'id': cursor}, 
													{$set: {'lastFeedPubdate': 'nigga'}},
													function (error, result) {
													if (error) {console.log('errororor')};
													});							

							
							/*console.log(item.title);
							newscollection.save({'title': item.title,
												'summary': item.summary,
												'description': item.description,
												'url': item.link,
												'pubdate': item.pubdate,
												'image': item.image,
												'categories': item.categories},
												function(error, doc){});
							console.log(item.pubdate)*/
							//db.close() Tämä pitäisi sijoittaa jotenkin järkevästi. Tässä kohtaa se sulkee db:n heti ekan uutisen jälkeen.
						});
				});

			};
		});
		
	});
}

exports.feedReader = feedReader;