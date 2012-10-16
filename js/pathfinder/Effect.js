var Effect = function(arguments) {
	this.name = "Bless";
	this.modifiers = [];
	this.duration = 10;
};

var EffectModifier = function( arguments ) {
	this.attribute = arguments.attributeToModify;
	this.amount = arguments.modifyAmount;

	/*
		modifiable:
			str, dex, con, etc
			ac

	*/
};