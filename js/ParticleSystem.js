/*****************************************************************************

    ParticleSystem
    --------------

    A container for a system of animated particles.

    Uses the following arguments:

    x, y, z, 				Position
    rx, ry, rz, 			Rotation per frame
    particleCount,			Number of particles for this system 
    type, 					Type of particle system:
    							STATIC_BOX: spawn particles in box shape, rotates
    							STATIC_SPHERE: spawn particles in sphere shape, rotates
    range, 					Size of area to spawn particles in
    size, 					Size of each particle
    particleAlpha, 			Alpha of each particle
    particleColour, 		Colour of each particle
    particleTexture			Texture of each particle

*****************************************************************************/



var ParticleSystem = function( arguments ) {
	
	// init variables
	this.rx = arguments.rx;			// rotation / logic frame
	this.ry = arguments.ry;
	this.rz = arguments.rz;

	this.geometry = undefined;		// 3d object data
	this.material = undefined;
	this.mesh = undefined;

	this.particles = undefined;		// array of particle meshes


	// setup geometry
	this.geometry = new THREE.Geometry();      // particles are basically a list of verts

    this.material = new THREE.ParticleBasicMaterial ({
        color: arguments.particleColour,
        size: arguments.size,

        // without setting up a texture, particles will be coloured squares
        map: THREE.ImageUtils.loadTexture( arguments.particleTexture ), // load a texture
        blending: THREE.AdditiveBlending, // additive blending ignores black backgrounds
        transparent: true,
        opacity: arguments.particleAlpha
    });


    // setup the individual particles
    switch(arguments.type) {

    	case "STATIC_BOX": {
		    // for each particle
		    for(var p = 0; p < arguments.particleCount; p++) {
		        // random position
		        var pX = (Math.random() * arguments.range - (arguments.range/2)) + arguments.x,
		            pY = (Math.random() * arguments.range - (arguments.range/2)) + arguments.y,
		            pZ = (Math.random() * arguments.range - (arguments.range/2)) + arguments.z;

		        // combine into single vertex
		        var particle =  new THREE.Vector3(pX, pY, pZ) ;

		        // add to particles list
		        this.geometry.vertices.push(particle);
		    }
		} break;

		case "STATIC_SPHERE": {

			function randomPoint() {
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

		    for(var p = 0; p < arguments.particleCount; p++) {

			    var points = randomPoint();

		        // random position
		        var pX = (points.x * arguments.range) + arguments.x,
		            pY = (points.y * arguments.range) + arguments.y,
		            pZ = (points.z * arguments.range) + arguments.z;

			    // combine into single vertex
		        var particle =  new THREE.Vector3(pX, pY, pZ) ;

		        // add to particles list
		        this.geometry.vertices.push(particle);
		    }

		} break;

		default: {
			throw "Invalid particle system type: " + arguments.type;
		} break;
	}

    // create the particle system
    this.mesh = new THREE.ParticleSystem ( this.geometry, this.material );

    // allow particles to be sorted
    this.mesh.sortParticles = true;
}



// game logic update loop
ParticleSystem.prototype.update = function() {

	// update rotation
	this.mesh.rotation.x += this.rx;
	this.mesh.rotation.y += this.ry;
	this.mesh.rotation.z += this.rz;
}



// add the particle system to the current scene
ParticleSystem.prototype.addToScene = function(s) {
	// add surface geomtry
	if(this.mesh) {		
		s.add(this.mesh);
	}
	else {
		throw "Trying to add invalid particle system to scene!";
	}
}


