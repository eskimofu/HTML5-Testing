
var MinecraftMap = function(mapSize, cubeSize) {
	this.mapSize = mapSize;
	this.cubeSide = cubeSize;

	this.tiles = new Array();

	for(var i = 0; i < this.mapSize; i++) {
		this.tiles[i] = new Array();

		for(var j = 0; j < this.mapSize; j++) {
			this.tiles[i][j] = new Array();

			for(var k = 0; k < this.mapSize; k++) {
				if(Math.random() > 0.99 ) {
					this.tiles[i][j][k] = 1;
				}
				else {
					this.tiles[i][j][k] = 0;
				}
			}
		}
	}
};

MinecraftMap.prototype.getTile = function(i, j, k) {
	return this.tiles[i][j][k];
};

MinecraftMap.prototype.setTile = function(i, j, k, value) {
	this.tiles[i][j][k] = value;
};

MinecraftMap.prototype.each = function(func) {
	for(var i = 0; i < this.mapSize; i++) {
        for(var j = 0; j < this.mapSize; j++) {
            for(var k = 0; k < this.mapSize; k++) {
            	func(i, j, k, this.tiles[i][j][k]);
            }
        }
    }
};