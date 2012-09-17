/*****************************************************************************/
/* VARIBLES & DEFAULTS */
/*****************************************************************************/

var canvasNameId = undefined;
var drawLoopFunction = undefined;
var logicLoopFunction = undefined;

var context = undefined;
var contextClearColour = "#ffffff";
var CONTEXT_WIDTH = 0;
var CONTEXT_HEIGHT = 0;

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
function setupEskylib(canvasName, w, h, drawFunc, logicFunc, clearCol) {

	try {
		if(canvasName) {
			canvasNameId = canvasName;
		} else {
			throw "No canvas specified.";
		}

		if(w && h) {
			CONTEXT_WIDTH = w;
			CONTEXT_HEIGHT = h;
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
            contextClearColour = clearCol;
        }
        else {
            contextClearColour = "#ffffff";
        }

        setupDrawing();
        setupControls();
        draw();
    }
    catch (error) {
        console.log("Eskylib Exception: " + error);
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
    $("*").click(function() {
        mouseClicked = true;
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
    var drawingCanvas = document.getElementById(canvasNameId);

    if(drawingCanvas) {
        // init context
        context = drawingCanvas.getContext('2d');

        // setup draw loop
        setInterval(draw, 10);
    }
    else {
        throw new Error("Error: couldn't initialize context");
    }
}



// clear canvas before rendering
function clearCanvas() {
    context.fillStyle = contextClearColour;
    context.fillRect(0,0,CONTEXT_WIDTH,CONTEXT_HEIGHT);
}



// main drawing loop
function draw() {
    if(context) {
        clearCanvas();
        logicLoopFunction();
        drawLoopFunction();
        mouseClicked = false;
    }
    else {
        throw new Error("Error: undefined context");
    }
}



/*****************************************************************************/
/* UTILITY API */
/*****************************************************************************/


function keyPressed(key) {
	return false;
}


function boundingBoxCollision(obj1, obj2) {
	return false;
}




/*****************************************************************************/
/* DRAWING API */
/*****************************************************************************/



 /*
     drawPoint()
     ******************************************************************

     Draw a point (3px).
     Assume canvas is already setup.
     Saves/restores context to avoid interfering with other elements.

     x: x position to draw at, int
     y: y position to draw at, int
     fill: fill colour in the format "#ffffff", string
 */
function drawPoint(x, y, fill) {
    context.save();
    context.translate(x,y);

    context.fillStyle = fill; 

    context.beginPath();
    context.fillRect(0,0,3,3);
    context.closePath();
    context.fill();

    context.restore();
}



/*
    drawLine()
    ******************************************************************

    Draw a line.
    Assume canvas is already setup.
    Saves/restores context to avoid interfering with other elements.

    x1: x position to draw from, int
    y1: y position to draw from, int
    x2: x position to draw to, int
    y2: y position to draw to, int
    stroke: stroke colour in the format "#ffffff", string
 */
function drawLine(x1, y1, x2, y2, stroke) {
    context.save();
    context.translate(x1,y1);

    context.strokeStyle = stroke;

    context.beginPath();
    
    context.moveTo(0,0);
    context.lineTo(x2,y2);

    context.closePath();
    context.stroke();

    context.restore();
}



 /*
	 drawRect()
	 ******************************************************************

	 Draw a rectangle.
	 Assume canvas is already setup.
	 Saves/restores context to avoid interfering with other elements.

	 x: x position to draw, int
	 y: y position to draw, int
	 w: width of rect, int
	 h: height of rect, int
	 fill: fill colour in the format "#ffffff", string
	 stroke: stroke colour in the format "#ffffff", string
	 r: rotation of rect
 */
function drawRect(x, y, w, h, fill, stroke, r) {
	context.save();
	context.translate(x,y);

	if(r) { context.rotate(r); }

    if(fill) { context.fillStyle = fill; }
    if(stroke) { context.strokeStyle = stroke; }

    context.beginPath();
    context.fillRect(0,0,w,h);
    context.closePath();
    context.fill();

    context.restore();
}


function drawCircle(x, y, rad, fill, stroke) {
    context.save();
    context.translate(x,y);

    if(fill) { context.fillStyle = fill; }
    if(stroke) { context.strokeStyle = stroke; }

    context.beginPath();

    context.arc(x,y,rad,0,Math.PI*2,true);

    context.closePath();
    context.fill();

    context.restore();
}


function loadImg(url) {
	var image = new Image();

    if(!url) {
        throw "Couldn't load image: " + url;
    }

    image.url = url;

	return image;
}


function drawImg(x, y, image, w, h, r) {
	context.save();
	context.translate(x,y);

    if(r) { context.rotate(r); }

    if(!image) {
        throw "Trying to draw invalid image.";
    } else {
        context.drawImage(image,x,y,w,h);
    }

	context.restore();
}


function drawText(text, font, x, y, fill, stroke) {
    context.save();
    context.translate(x,y);

    if(fill) { context.fillStyle = fill; }
    if(stroke) { context.strokeStyle = stroke; }

    if(font) { context.font = font; } 
    else     { context.font = '12px sans-serif'; }

    context.textBaseline = 'top';

    if(fill) { context.fillText(text,0,0); }
    if(stroke) { context.strokeText(text,0,0); }

    context.restore();
}