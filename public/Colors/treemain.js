var point;
var width;
var height;
var accuracy;
var startOrientation;
var yGravity= 0.5;
var xGravity = 0;


var world;
function setup() {
    width = $(window).width();
    height = $(window).height();

    var myCanvas = createCanvas(width, height);
    myCanvas.parent('container');
    var url = window.location.href;
    
    var arr = url.split("?");
    var arr = arr[1].split("&");

    c1 =arr[0].split("=")[1]
    c1 = decodeURIComponent(c1);
    color1 = JSON.parse(c1);
    c2 =arr[1].split("=")[1]
    c2 = decodeURIComponent(c2);
    color2 = JSON.parse(c2);
    n = parseInt(arr[2].split("=")[1]);

    colors = createLABRamp(color1, color2, n);
    for(var i = 0; i < colors.length; i++){


        var tmp = rgbToHex(colors[i].r, colors[i].g, colors[i].b);

        colors[i] = tmp;
    }

    tree = new verletTree(width/2, height,5 , 3.14/8,  colors, 1.0)

  

    

    
}
function draw(){
	background(50);
    tree.update();
	tree.draw();
}
function click(event){
   tree.click(mouseX, mouseY);
  
};


function motion(event){


  
}
function key(event){
  
}



$(window).on("touch", click);
//$(window).on("mousedown", click);
$(window).on("mousemove", click);

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    r = Math.floor(parseInt(r));
    g = Math.floor(parseInt(g));
    b = Math.floor(parseInt(b));
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

