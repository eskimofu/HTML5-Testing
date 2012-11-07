var GetTweet = function(twitterID, showLog) {
	// get the latest tweet from twitter feed 

	if(showLog) {
		console.log("Getting twitter data for user: @" + twitterID);
	}
	
	$.ajax({ 
		url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
		dataType: "jsonp",
		data: {
		  	user_id: twitterID,
		  	count: 1
		},
		success: function(data) {
		  	// got tweet, load into page

		  	if(showLog) {
			  	console.log("Success response:");
			  	console.log("  data: " + data);
			}

		  	if(data) { 
		  		// data object valid 

		  		if(showLog) {
			  		console.log("Data added to DOM"); 
			  	}
		  	} else {
		  		// data object not valid

		  		if(showLog) {
			  		console.error("Error getting tweet data");
			  	}

		  		addPlaceholderTweet();
		  	}
		}
	})
	.fail( function() {
		// error getting json request

		if(showLog) {
			console.error("Error getting latest tweet");
		}

		// fallback to default placeholder tweet 
		addPlaceholderTweet();
	});


	function addPlaceholderTweet() {
		// add tweet data 

		if(showLog) {
			// ...

			console.warn("Added placeholder tweet");
		}
	}

	return "Latest tweet here";
}