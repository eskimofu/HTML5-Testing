// base class for all creatures
var Creature = function( arguments ) {
    this.name = (arguments.name ? arguments.name : "New Creature");

    this.race = arguments.race;
    this.class = arguments.class;	// is this a protected var?

    this.age = arguments.age;
    this.gender = arguments.gender;
    this.alignment = arguments.alignment;
    this.weight = arguments.weight;
    this.backgroundInformation = arguments.backgroundInformation;	// string with background flavour text
    this.mood = arguments.mood;

    this.moveSpeed = 5;

    this.level = arguments.level;
    this.experiencePoints = arguments.experiencePoints;
    this.nextLevelExperiencePoints = arguments.nextLevelExperiencePoints;

    this.hitDice = new HitDice(arguments.hitDice); // represent as a map? how to show 1d4, 2d8, etc

    this.baseAttributes = arguments.baseAttributes;
    this.modifiedAttributes = 0;

    this.equipedItems = ["head": "",
    					 "face": "",
    					 "throat": "",
    					 "shoulders": "",
    					 "body": "",
    					 "torso": "",
    					 "arms": "",
    					 "hands": "",
    					 "ringLeft": "",
    					 "ringRight": "",
    					 "waist": "",
    					 "feet": "" ];
    this.bags = []; 

    this.moneyPlatinum = 0;
    this.moneyGold = 0;
    this.moneySilver = 0;
    this.moneyCopper = 0;

    this.hunger = 0;
    this.thirst = 0;
    this.tiredness = 0;

    this.languages = [];

    this.effects = [];

    this.knownSkills = [];
    this.knownFeats = [];
    this.knownSpells = [];
    this.knownPowers = [];

    this.spellsPerDay = []; // keep track of spells per day for each level using an array
    this.powersPerDay = [];

    this.baseAttackBonus = 0;

    this.damageReduction = 0;
    this.spellResist = 0;
    this.actionPoints = 0;

    this.creatures = []; // in the format "familiar: new Creature(), pet: new Creature()", etc
   

    // all these need to be calculated based on other attributes, but just set them to 0 for now
    this.maxHP = 0;
    this.currentHP = 0;
    this.AC = 0;
    this.fortitudeSave = 0;
    this.reflexSave = 0;
    this.willSave = 0;
    this.initiative = 0;

   // this.calculateAllAttributes();
};
Creature.prototype.pickupBag = function(bag) {};
Creature.prototype.dropBag = function(bag) {};
Creature.prototype.destroyBag = function(bag) {};

Creature.prototype.pickupItem = function(item, bag) {};
Creature.prototype.dropItem = function(item, bag) {};
Creature.prototype.destroyItem = function(item, bag) {};

Creature.prototype.equipPickedUpItem = function(item, bag) {};
Creature.prototype.unequipPickedUpItem = function(item) {};

Creature.prototype.attackMelee = function(targetCreature) {};
Creature.prototype.attackRanged = function(targetCreature) {};
Creature.prototype.castSpell = function(spellName, target) {}; // target can be a creature, item, whatever
Creature.prototype.usePower = function(powerName, target) {};
Creature.prototype.useItem = function(itemName, target) {};

// give the creature experience points, and if it hits the next level amount level the creature up and reset counter
Creature.prototype.giveExperience = function(amount) {
	this.experiencePoints += amount;

	if(this.experiencePoints >= this.nextLevelExperiencePoints) {

		this.levelUp();
	}
};

// level up the creature
Creature.prototype.levelUp = function() {
	this.level++;

	// extra level up effects here
};

// recalculate all attributes that can change like HP, AC, etc
// taking into account items, racial modifiers, effects, etc
Creature.prototype.calculateAllAttributes = function() {

};

// update the creature and all effects, hunger, etc
Creature.prototype.update = function(timePeriod) {
	// hunger

	// tiredness

	// thirst

	// go through effects and check they haven't run out
};