/*****************************************************************************

    Skybox
    ------

    ___


    Takes the following arguments:
        rx, ry, rz, scale, xpos, xneg, ypos, yneg, zpos, zneg, scene


*****************************************************************************/

var Skybox = function(arguments) {

	this.rx = arguments.rotationX;
	this.ry = arguments.rotationY;
	this.rz = arguments.rotationZ;

	this.cubeSize = arguments.scale;
	this.materials = [];

	// create the materials from provided textures
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[0] ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[1] ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[2] ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[3] ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[4] ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( arguments.texture[5] ) } ) );

	for(var i = 0; i < this.materials.length; i++ ) {
		if(!this.materials[i]) {
			console.error( "Error loading Skybox material #" + i);
		}

		// set the material to only show the inside
		this.materials[i].side = THREE.BackSide;
	}

	// create geometry
	this.geometry = new THREE.CubeGeometry( this.cubeSize, this.cubeSize, this.cubeSize, 1, 1, 1, this.materials);

	// create mesh
	this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial() );

	// render on the inside of the box for the skybox to work
	this.mesh.flipSided = true;

	this.mesh.rotation.x += 400;
	this.mesh.rotation.y += 300;
	//this.mesh.rotation.z += Math.random() * 100;
}


Skybox.prototype.update = function() {
	this.mesh.rotation.x += this.rx;
	this.mesh.rotation.y += this.ry;
	this.mesh.rotation.z += this.rz;
}


Skybox.prototype.addToScene = function(s) {
	// add surface geomtry
	if(this.mesh) {		
		s.add(this.mesh);
	}
	else {
		throw "Skybox mesh invalid";
	}
}