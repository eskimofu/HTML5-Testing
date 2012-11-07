
// bot configuration
var config = {
	channels: ["#BotTests", "#Awesome"],
	server: "irc.freenode.net",
	botName: "myBot"
};

// require IRC lib
var irc = require("irc");

// create bot
var bot = new irc.Client(config.server, config.botName, {channels: config.channels } );

// listen for channel joins
bot.addListener("join", function(channel, who) {
	// have the bot speak
	bot.say(channel, who + " is here - welcome!");
});

// direct message a user when they say hi to you
bot.addListener("message", function(from, to, text, message) {
	if(message === "hi") {
		bot.say(from, "hi there " + from + "!");
	}
});

// respond to to any message written
bot.addListener("message", function(from, to, text, message) {
	bot.say(config.channels[0], "That's what she said.");
});
