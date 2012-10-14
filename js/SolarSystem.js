/*****************************************************************************

    SolarSystem
    -----------

    A manager for a solar system of planets and particle systems, with a 
    containing skybox.


    Takes the following arguments:
        scene 				Scene all containing elements should be added to
        ambientLightColour  Colour of ambient light in scene

    Requires:
    	Planet.js
    	ParticleSystem.js
    	Skybox.js

*****************************************************************************/

var SolarSystem = function(arguments) {

	this.scene = arguments.scene;

	this.planets = [];
	this.particleSystems = [];
	this.skybox = undefined;

	this.ambientLight = undefined;
	
    // setup ambient light if one specified
    if(arguments.ambientLightColour) {
        this.ambientLight = new THREE.AmbientLight(arguments.ambientLightColour);
    }
}


// load and then add a planet to the solar system
// then add it to be rendered
SolarSystem.prototype.addPlanet = function(planet) {
	// add to array of planets
	this.planets.push(planet);

	planet.addToScene(this.scene);

	    // if ambient light exists, add to scene
   /* if(this.ambientLight) {
        this.scene.add(this.ambientLight);
    }*/

	return planet;
}


SolarSystem.prototype.addParticleSystem = function(particleSystem) {
	this.particleSystems.push(particleSystem);

	particleSystem.addToScene(this.scene);

	return particleSystem;
}


SolarSystem.prototype.setSkybox = function(skybox) {
	this.skybox = skyBox;
	this.skybox.addToScene(this.scene);
}


SolarSystem.prototype.update = function() {
	var i;

	for (i = 0; i < this.planets.length; i++) {
		this.planets[i].update();
	}

	for (i = 0; i < this.particleSystems.length; i++) {   
		this.particleSystems[i].update();
	}
}


SolarSystem.prototype.setParent = function() {
	
}