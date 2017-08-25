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
    color1 = {r:0, g:120, b:100};
    color2 = {r:200 , g:100, b:130};
    n = 30;
    ramp1 = createLABRamp(color1, color2, n);
    ramp2 = createRGBRamp(color1, color2, n);
    noStroke();
    $("#c1-r").val(color1.r);
    $("#c1-g").val(color1.g);
    $("#c1-b").val(color1.b);
    $("#c2-r").val(color2.r);
    $("#c2-g").val(color2.g);
    $("#c2-b").val(color2.b);
    $("#n").val(n);
    bindListeners();
}
function draw(){
	background(50);
    
    
    drawRamps();
}
function bindListeners(){
    $("#c1-r").on("change", function(){color1.r = parseInt($(this).val()); updateColors();})
    $("#c1-g").on("change", function(){color1.g = parseInt($(this).val()); updateColors();})
    $("#c1-b").on("change", function(){color1.b = parseInt($(this).val()); updateColors();})
    $("#c2-r").on("change", function(){color2.r = parseInt($(this).val()); updateColors();})
    $("#c2-g").on("change", function(){color2.g = parseInt($(this).val()); updateColors();})
    $("#c2-b").on("change", function(){color2.b = parseInt($(this).val()); updateColors();})
    $("#n").on("change", function(){n = parseInt($(this).val()); updateColors();})
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
function updateColors(){
    ramp1 = createLABRamp(color1, color2, n);

    ramp2 = createRGBRamp(color1, color2, n);
}
