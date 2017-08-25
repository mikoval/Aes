var color1; 
var color2;
var ramp1;
var ramp2;

var n;
function setup() {
    width = $(window).width();
    height = $(window).height();

    var myCanvas = createCanvas(width, height);
    myCanvas.parent('container');
    color1 = {r:0, g:120, b:240};
    color2 = {r:255, g:100, b:130};
    n = 100;
    ramp1 = createLABRamp(color1, color2, n);
    ramp2 = createRGBRamp(color1, color2, n);
    noStroke();
    
}
function draw(){
	background(50);
    
    
    drawRamps();
}

function drawRamps(){
    
    for (var i = 0; i < ramp1.length; i++){
        fill(ramp1[i].r, ramp1[i].g, ramp1[i].b);
        rect(i * width/ramp1.length,0, width/ramp1.length + 1, height/2);
    }
    for (var i = 0; i < ramp2.length; i++){
        fill(ramp2[i].r, ramp2[i].g, ramp2[i].b);
        rect(i * width/ramp2.length,height/2, width/ramp2.length + 1, height/2);
    }
}

