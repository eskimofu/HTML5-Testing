var prefixes = [ "algor", 
				 "elga", 
				 "ilgo", 
				 "ulgi", 
				 "shama", 
				 "belfir", 
				 "montague", 
				 "horriston", 
				 "belch", 
				 "chobb", 
				 "sunk", 
				 "mellon", 
				 "chimp"
			   ];

var suffixes = [ "athia", 
				 "etha", 
				 "ia", 
				 "uthia", 
				 "olara", 
				 "mania", 
				 "shibbia", 
				 "coppia", 
				 "ornia", 
				 "gattick", 
				 "morrin", 
				 "shipe"
			   ];

var i, word, words = [], pre, suf, exists = false;

function checkExists(w) {
	for (i = 0; i < words.length; i++ ) {
		if(words[i] === w) {
			console.log("Word exists, trying again");
			return true;
		}
	}

	return false;
}

for (i = 0; i < 20; i++ ) {
	while(!exists) {
		pre = prefixes[Math.floor(Math.random() * prefixes.length)];
		suf = suffixes[Math.floor(Math.random() * suffixes.length)];

		word = pre + suf;

		if(!checkExists(word)) {
			exists = true;
		}
	}

	words.push(word);
	exists = false;
}

for (i = 0; i < words.length; i++ ) {
	console.log(words[i]);
}

console.log("Total words: " + words.length);

