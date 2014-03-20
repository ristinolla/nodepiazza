/*

These are the credentials of twitter stream. These are accoutn and application specific. 
Can be created from twitter developer sites. 

*/

var settings = {
    consumer_key: '9tZj3F4z8pykSLt10eDPBg',
    consumer_secret: '7ZPP5nsw4NqTrsuVpe39q9TOSisr1ByOWFW3yGFys',
    access_token_key: '602628098-LPrzS3FesDFTXwnOcXNrIhigY58AJmI1H46jd43G',
    access_token_secret: 'WFods4LudBb8BNou2aCLzYauqu4uFMqm9muhcQeQ4u03u',

    //If useUserFilter is TRUE, it will use follow mode, which means following twitter user's tweets
    //If useUserFilter is FALSE, it will use track mode, which will follow for keywords
    useUserFilter: 'FALSE',

    tagFilter:
    		  	  ['kokoomus', 
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
                   'ukraine'],

    //In user filter Twitter user ID's needs to be used: http://gettwitterid.com/
    userFilter:
    		  	  ['602628098', 	//AEParviainen
    		  	   '25388283', 		//ristinolla
    		  	   '36048614'] 		//alexstubb
    
};

 
module.exports = settings;