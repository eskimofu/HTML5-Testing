

var Skybox = function(rx, ry, rz, scale, xpos, xneg, ypos, yneg, zpos, zneg, scene) {

	this.rx = rx;
	this.ry = ry;
	this.rz = rz;

	this.cubeSize = scale;
	this.materials = [];

	// create the materials from provided textures
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( xpos ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( xneg ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( ypos ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( yneg ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( zpos ) } ) );
	this.materials.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( zneg ) } ) );

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
	//this.mesh.side = true;
	//this.mesh.doubleSided = true;

	// set the scene rotation randomly
	/*this.mesh.rotation.x += Math.random() * 100;
	this.mesh.rotation.y += Math.random() * 100;
	this.mesh.rotation.z += Math.random() * 100;*/

	this.mesh.rotation.x += 400;
	this.mesh.rotation.y += 300;
	//this.mesh.rotation.z += Math.random() * 100;

	// add to scene
	scene.add(this.mesh);

	console.log("Added skybox");
}

Skybox.prototype.update = function() {
	this.mesh.rotation.x += this.rx;
	this.mesh.rotation.y += this.ry;
	this.mesh.rotation.z += this.rz;
}