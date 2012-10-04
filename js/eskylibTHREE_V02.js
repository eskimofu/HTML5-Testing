/*****************************************************************************/
/* VARIBLES & DEFAULTS */
/*****************************************************************************/

var container = undefined;
var drawLoopFunction = undefined;
var logicLoopFunction = undefined;

var clearColour = "#ffffff";
var WIDTH = 0;
var HEIGHT = 0;
var VIEW_ANGLE = 45;
var ASPECT = 0; // WIDTH / HEIGHT
var NEAR = 0.1;
var FAR = 10000;

var renderer,
    camera,
    scene;

var isPlaying = true;

var mouseX = 0;
var mouseY = 0;
var mouseClicked = false;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP_ARROW = 38;
var DOWN_ARROW = 40;



/*****************************************************************************/
/* SETUP */
/*****************************************************************************/



// setup the library
function setupEskylib(containerID, w, h, drawFunc, logicFunc, clearCol) {

	try {
		if(containerID) {
			container = $(containerID);
		} else {
			throw "No container specified.";
		}

		if(w && h) {
			WIDTH = w;
			HEIGHT = h;
		} else {
			throw "No canvas size specified.";
		}

		if(drawFunc) {
			drawLoopFunction = drawFunc;
		} else {
			throw "No draw function specified.";
		}

		if(logicFunc) {
			logicLoopFunction = logicFunc;
		} else {
			throw "No logic function specified.";
		}

        if(clearCol) {
            clearColour = clearCol;
        }
        else {
            clearColour = 0x000000;
        }

        setupDrawing();
        setupControls();
        //draw();
    }
    catch (error) {
        console.log("Eskylib Exception in setupEskylib(): " + error);
    }
}



// setup controls
function setupControls() {
    $(document).keyup(function(event) {
        var key = event.which;

        if(key == 37) {
            leftPressed = false;
        }
        else if(key == 39) {
            rightPressed = false;
        }
        else if(key == 38) {
            upPressed = false;
        }
        else if(key == 40) {
            downPressed = false;
        }
    });

    // pause canvas on click
    $("*").mousedown(function() {
        mouseClicked = true;
    });

    $("*").mouseup(function() {
        mouseClicked = false;
    });

    // keep track of mouse coordinates
    $(document).mousemove(function(e) {
        if(isPlaying) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        }
    });
}



// setup canvas for drawing
function setupDrawing() {

    ASPECT = WIDTH / HEIGHT;

    // scene element setup
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
    scene = new THREE.Scene();

    // add camera to scene
    scene.add(camera);

    // pull camera back
    camera.position.z = 300;

    // setup renderer size
    renderer.setSize(WIDTH,HEIGHT);

    // get the dom element and replace the 'viewport-container' with it
    container.append(renderer.domElement);
}


// nothing will be drawn until this starts
function startDrawing() {
    // setup draw loop
    setInterval(draw, 10);
}



// clear canvas before rendering
function clearCanvas() {
    //context.fillStyle = contextClearColour;
    //context.fillRect(0,0,CONTEXT_WIDTH,CONTEXT_HEIGHT);
}



// main drawing loop
function draw() {
    if(container) {
        //clearCanvas();
        logicLoopFunction();
        drawLoopFunction();
    }
    else {
        throw new Error("Error: undefined context");
    }
}


