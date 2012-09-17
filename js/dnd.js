var User = function() {
	this.name = "New User";

	this.creatures = [];
};


// base class for all creatures
var Creature = function() {
    this.name = "New Creature";
    this.race = "Race";
    this.height = 1;
    this.weight = 1;

    this.level = 1;
    this.xp = 0;

    this.currentHP = 10;
    this.maxHP = 10;

    this.initiative = 0;

    this.strength = 10;
    this.dexterity = 10;
    this.constitution = 10;
    this.wisdom = 10;
    this.intelligence = 10;
    this.charisma = 10;

    this.items = []; // array of items
};
Creature.prototype.addItem = function(item) {};
Creature.prototype.removeItem = function(item) {};


var Item = function() {
	this.name = "New Item";
	this.type = "none"; // weapon, food, ...
	this.effect = "";
	this.equipable = false;
};


var Tile = function() {
	this.tile = 0;
	this.type = ""; // WATER, GRASS, ETC 
	this.solid = false;
};


var Tilemap = function() {

};


var Map = function() {
	this.name = "New Map";
	this.tiles = [][]; // of tiles
	this.tilemap = []; // of tilemaps
};
Map.prototype.draw = function() {};

var Camera = function() {
	this.x;
	this.y;
};

var World = function() {
	this.name = "New World";
	this.gravity = 1;
	this.map = {};
};