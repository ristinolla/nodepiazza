var feedReader = require('./feed-reader-server-functions').feedReader

//setTimeout(feedReader.insertFeeds(),2000);

setTimeout(feedReader.readAllFeeds(),1000);
