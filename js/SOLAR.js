


/* Solar System *************************************************************/

var SolarSystem = function(scene) {

	this.scene = scene;

	this.planets = [];
	this.particleSystems = [];
}


// load and then add a planet to the solar system
// then add it to be rendered
SolarSystem.prototype.addPlanet = function(planet) {
	// add to array of planets
	this.planets.push(planet);

	planet.addToScene(scene);

	return planet;
	//console.log("Added planet: " + planet.x, planet.y, planet.z);
}


SolarSystem.prototype.addParticleSystem = function(particleSystem) {
	this.particleSystems.push(particleSystem);

	particleSystem.addToScene(scene);

	return particleSystem;
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




/* Planet ************************************************************

	Planets blah blah

*/
var Planet = function(name, x, y, z, rx, ry, rz, mx, my, mz, scale, surfaceTexture, atmosphereTexture, surfaceTextureType, atmosphereRotationFactor, atmosphereAlpha, lightColour, lightIntensity, coronaTexture) {

	// planet name
	this.name = name;

	// level of detail for spheres
	this.sphereRadius = 100;
	this.sphereSegments = 32;		// lower for better performance
	this.sphereRings = 32;			// lower for better performance

	// rotation per frame
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;

	// atmosphere rotation
	if(atmosphereRotationFactor) {
		this.arx = rx * atmosphereRotationFactor;
		this.ary = ry * atmosphereRotationFactor;
		this.arz = rz * atmosphereRotationFactor;
	}

	// movement per frame
	this.mx = mx;
	this.my = my;
	this.mz = mz;

	// scale (relative to this.sphereRadius)
	this.scale = scale;

	// surface 3d data
	this.surfaceGeometry = undefined;
	this.surfaceMaterial = undefined;
	this.surfaceMesh = undefined;

	// atmosphere 3d data (optional)
	this.atmosphereGeometry = undefined;
	this.atmosphereMaterial = undefined;
	this.atmosphereMesh = undefined;

	this.path = undefined;			// path planet will travel

	this.particleSystems = [];		// particle systems attached to this planet

	this.planets = [];				// child planets of this planet

	this.atmosphereRotationFactor = atmosphereRotationFactor;	// speed of atmosphere texture rotation relative to planet rotation
	this.atmosphereAlpha = atmosphereAlpha;		// alpha of texture

	// light (optional)
	this.lightColour = lightColour;
	this.lightIntensity = lightIntensity;
	this.light = undefined;

	// corona (optional)
	this.corona = undefined;

	// rings (optional)
	this.rings = undefined;

	this.parent = undefined;		// parent object


	// setup the geometry and materials
	try {
		// setup surface geometry
	    this.surfaceGeometry = new THREE.SphereGeometry ( this.sphereRadius * this.scale, this.sphereSegments, this.sphereRings );

	    // setup texture
	    if(surfaceTextureType === "BASIC") {
		    this.surfaceMaterial = new THREE.MeshBasicMaterial ( {   
		        map: THREE.ImageUtils.loadTexture( surfaceTexture )
		    } );
		}
	    else if(surfaceTextureType === "LAMBERT") {
		    this.surfaceMaterial = new THREE.MeshLambertMaterial ( {   
		        map: THREE.ImageUtils.loadTexture( surfaceTexture )
		    } );
		}

	    // build mesh from combined geometry/texture
	    this.surfaceMesh = new THREE.Mesh(this.surfaceGeometry, this.surfaceMaterial);

	    // position in the world
	    this.surfaceMesh.position.x = x;
	    this.surfaceMesh.position.y = y;
	    this.surfaceMesh.position.z = z;

	    // set an initial random rotation, to avoid the same textures looking too similar
	    this.surfaceMesh.rotation.x = Math.random() * 100;
	    this.surfaceMesh.rotation.y = Math.random() * 100;
	    this.surfaceMesh.rotation.z = Math.random() * 100;


	    // setup atmosphere geometry (if included)
	    if(atmosphereTexture) {
		    this.atmosphereGeometry = new THREE.SphereGeometry ( (this.sphereRadius * this.scale) + (this.sphereRadius * (this.scale * 0.035)), this.sphereSegments, this.sphereRings );

		    if(surfaceTextureType === "BASIC") {
			    this.atmosphereMaterial = new THREE.MeshBasicMaterial ( {   
			        map: THREE.ImageUtils.loadTexture( atmosphereTexture ),
			        blending: THREE.AdditiveBlending, 
	                transparent: true,
	                opacity: atmosphereAlpha
			    } );
			}
			else if(surfaceTextureType === "LAMBERT") {
				this.atmosphereMaterial = new THREE.MeshLambertMaterial ( {   
			        map: THREE.ImageUtils.loadTexture( atmosphereTexture ),
			        blending: THREE.AdditiveBlending, 
	                transparent: true,
	                opacity: atmosphereAlpha
			    } );
			}

		    this.atmosphereMesh = new THREE.Mesh(this.atmosphereGeometry, this.atmosphereMaterial);

		    this.atmosphereMesh.position.x = x;
		    this.atmosphereMesh.position.y = y;
		    this.atmosphereMesh.position.z = z;

		    this.atmosphereMesh.rotation.x = Math.random() * 100;
		    this.atmosphereMesh.rotation.y = Math.random() * 100;
		    this.atmosphereMesh.rotation.z = Math.random() * 100;
		}


		// setup light source (if included)
		if(this.lightColour && this.lightIntensity) {

			this.light = new THREE.PointLight(this.lightColour);

            this.light.position.x = x;
            this.light.position.y = y;
            this.light.position.z = z;

            this.light.intensity = this.lightIntensity;
		}

		// setup corona (if included)
		if(coronaTexture) {
			this.corona = new THREE.Sprite ( {
				map: coronaTexture,
				useScreenCoordinates: false,
				color: 0xff0000
				//alignment: THREE.SpriteAlignment
			});

			this.corona.position.set(-150,100,0);

			this.corona.scale.x = 200;
			this.corona.scale.y = 200;
		}
	}
	catch (exception) {
		console.log("SOLAR.js: Error setting up Planet");
	}
}


Planet.prototype.update = function(parent) {

	// be sure to keep child planets/particle systems updated with parent planet movement
	// in fact, should planets simply be rotated around their parent?

	// apply planet movement
	if(parent) {
		this.surfaceMesh.position.x += this.mx;
		this.surfaceMesh.position.y += this.my;
		this.surfaceMesh.position.z += this.mz;
	}
	

	// apply planet rotation
	this.surfaceMesh.rotation.x += this.rx;
	this.surfaceMesh.rotation.y += this.ry;
	this.surfaceMesh.rotation.z += this.rz;

	// update atmosphere if loaded
	if(this.atmosphereMesh) {
		// apply planet movement
		this.atmosphereMesh.position.x += this.mx;
		this.atmosphereMesh.position.y += this.my;
		this.atmosphereMesh.position.z += this.mz;

		// apply planet rotation
		this.atmosphereMesh.rotation.x += this.arx;
		this.atmosphereMesh.rotation.y += this.ary;
		this.atmosphereMesh.rotation.z += this.arz;
	}

	// update light if loaded
	if(this.light) {
		this.light.position.x += this.mx;
		this.light.position.y += this.my;
		this.light.position.z += this.mz;
	}

	// update all attached particle systems
	for (i = 0; i < this.particleSystems.length; i++) {  
		this.particleSystems[i].update();
	}

	// update attached planets
	for (i = 0; i < this.planets.length; i++) { 
		this.planets[i].update(this);
	}
}


// add the planet to the scene, with any additional components loaded (atmohsphere, light)
Planet.prototype.addToScene = function(s) {
	// add surface geomtry
	if(this.surfaceMesh) {		
		s.add(this.surfaceMesh);
		console.log("Added planet surface at " + this.surfaceMesh.position.x, this.surfaceMesh.position.y, this.surfaceMesh.position.z);
	}
	else {
		throw "Planet mesh invalid";
	}

	// add atmosphere geo (if loaded) 
	if(this.atmosphereMesh) {		
		s.add(this.atmosphereMesh);
		console.log("Added planet atmosphere at " + this.atmosphereMesh.position.x, this.atmosphereMesh.position.y, this.atmosphereMesh.position.z);
	}

	// add light (if loaded) 
	if(this.light) {
		s.add(this.light);
		console.log("Added light " + this.lightColour + ", " + this.lightIntensity + " at " + this.light.position.x, this.light.position.y, this.light.position.z);
	}

	// add corona (if loaded)
	if(this.corona) {
		s.add(this.corona);
		console.log("Added corona at " + this.corona.position.x, this.corona.position.y, this.corona.position.z);
	}
}



Planet.prototype.addChildPlanet = function(child, scene) {
	this.planets.push(child);
	child.addToScene(scene);
	child.setParent(this);
}



Planet.prototype.addChildParticleSystem = function(child, scene) {
	this.particleSystems.push(child);
	child.addToScene(scene);
	child.setParent(this);
}



// set the parent object to rotate around
Planet.prototype.setParent = function(parent) {
	this.parent = parent;
}




/* Particles *************************************************************/

var ParticleSystem = function(x, y, z, rx, ry, rz, particleCount, type, size, range, particleAlpha, particleColour, particleTexture) {
	
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;

	this.particleCount = particleCount;

	this.geometry = undefined;
	this.material = undefined;
	this.mesh = undefined;

	this.size = size;
	this.type = type;		// "STATIC_BOX, STATIC_SPHERE, EXPLODER"

	this.particles = undefined;



	this.geometry = new THREE.Geometry();      // particles are basically a list of verts

    this.material = new THREE.ParticleBasicMaterial ({
        color: particleColour,
        size: this.size,

        // without setting up a texture, particles will be coloured squares
        map: THREE.ImageUtils.loadTexture( particleTexture ), // load a texture
        blending: THREE.AdditiveBlending, // additive blending ignores black backgrounds
        transparent: true,
        opacity: particleAlpha
    });

    switch(this.type) {

    	case "STATIC_BOX": {
		    // for each particle
		    for(var p = 0; p < particleCount; p++) {
		        // random position
		        var pX = Math.random() * range - (range/2),
		            pY = Math.random() * range - (range/2),
		            pZ = Math.random() * range - (range/2);

		        // combine into single vertex
		        var particle =  new THREE.Vector3(pX, pY, pZ) ;

		        // add to particles list
		        this.geometry.vertices.push(particle);
		    }
		} break;

		case "STATIC_SPHERE": {

		    for(var p = 0; p < particleCount; p++) {

			    var points = this.randomPoint();

		        // random position
		        var pX = (points.x * range) + x,
		            pY = (points.y * range) + y,
		            pZ = (points.z * range) + z;

			    // combine into single vertex
		        var particle =  new THREE.Vector3(pX, pY, pZ) ;

		        // add to particles list
		        this.geometry.vertices.push(particle);
		    }

		} break;



		default: {
			throw "Invalid particle system type: " + this.type;
		} break;
	}

    // create the particle system
    this.mesh = new THREE.ParticleSystem ( this.geometry, this.material );

    // allow particles to be sorted
    this.mesh.sortParticles = true;
}


ParticleSystem.prototype.randomPoint = function()
{
    var x = Math.random() - 0.5, y = Math.random() - 0.5, z = Math.random() - 0.5;
    var k = Math.sqrt(x*x + y*y + z*z);

    while (k < 0.2 || k > 0.3)
    {
        x = Math.random() - 0.5;
        y = Math.random() - 0.5;
        z = Math.random() - 0.5;
        k = Math.sqrt(x*x + y*y + z*z);
    }

    return {x:x/k, y:y/k, z:z/k};
}


ParticleSystem.prototype.update = function() {

	this.mesh.rotation.x += this.rx;
	this.mesh.rotation.y += this.ry;
	this.mesh.rotation.z += this.rz;
}


// add the planet to the scene, with any additional components loaded (atmohsphere, light)
ParticleSystem.prototype.addToScene = function(s) {
	// add surface geomtry
	if(this.mesh) {		
		s.add(this.mesh);
		console.log("Added particle system at " + this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
	}
	else {
		throw "Particle system invalid";
	}
}


ParticleSystem.prototype.setParent = function(parent) {

}

