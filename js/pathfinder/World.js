var World = function(arguments) {
	this.name = arguments.name;//"New World";
	this.gravity = arguments.gravity;
	this.currentTime = arguments.time;//new Date();
	this.currentWeather = 0;

	this.map = arguments.map;

	// database of all types of things that can exist in the world
	this.alignments = [];
	this.races = [];
	this.classes = [];
	this.genders = [];
	this.languages = [];
	this.spells = [];
	this.powers = [];
	this.effects = [];		// buffs/debuffs like poison, bless, etc
	this.debuffs = [];
	this.weatherTypes = [];
	this.items = [];
	this.npcs = [];
	this.pcs = [];

	// current encounter keeps track of relevant things in the current scene
	this.creatures = [];
};

// load the world from json
World.prototype.loadFromJSON = function(arguments) {
};

// increment the world time by the number of milliseconds specified
World.prototype.tick = function(timePeriod) {
};

// update all things in the world
World.prototype.update = function(timePeriod) {
	for each creature in creatures { creature.update(timePeriod); }
};