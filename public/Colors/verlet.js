var damping = 1.0;
var cellSize = 32;
function verletWorld(){
	this.objects = [];
	var grid = new Array(Math.ceil(width/cellSize));
	for(var i = 0; i < grid.length; i++){
		grid[i] = new Array(Math.ceil(height/cellSize));
	}
	this.grid = grid;
	this.update = function(){
		
		for(var i = 0; i < this.objects.length; i++){
			
			this.objects[i].update();
		}
	}
	this.setGrid = function(){
		var grid = this.grid;
		for(var i = 0; i <grid.length; i++){
			for(var j = 0; j <grid[0].length; j++){
				grid[i][j] = [];
			}	
		}
		for(var i = 0; i < this.objects.length; i++){
			var obj = this.objects[i];
			var x = obj.x;
			var y = obj.y;
			var gx = Math.floor(x/cellSize);
			var gy = Math.floor(y/cellSize);
			gx = this.clampX(gx);
			gy = this.clampY(gy);
			grid[gx][gy].push(i);

		}

	}
	this.clampX = function(gx){
		if(gx < 0)
			gx = 0;
		if(gx >= this.grid.length)
			gx = this.grid.length -1;
		return gx;
	}
	this.clampY = function(gy){
		if(gy < 0)
			gy = 0;
		if(gy >= this.grid[0].length)
			gy = this.grid[0].length -1;
		return gy;
	}
	this.constrain = function(){
		for(var i = 0; i < this.objects.length; i++){
			
			this.objects[i].constrain();
		}
	}
	this.collisions = function(){
		this.setGrid();
		var grid = this.grid;

		for(var i=0; i < this.objects.length; i++){
	        var body1 = this.objects[i];
	        var xStart = body1.x;
			var yStart = body1.y;
	
			var gx = Math.floor(xStart/cellSize);
			var gy = Math.floor(yStart/cellSize);
			gx = this.clampX(gx);
			gy = this.clampY(gy);
			
			var objs = grid[this.clampX(gx-1)][this.clampY(gy-1)].concat(grid[gx][this.clampY(gy-1)]).concat(grid[this.clampX(gx+1)][this.clampY(gy-1)])
			.concat(grid[this.clampX(gx-1)][gy]).concat(grid[gx][gy]).concat(grid[this.clampX(gx+1)][gy])
			.concat(grid[this.clampX(gx-1)][this.clampY(gy+1)]).concat(grid[gx][this.clampY(gy+1)]).concat(grid[this.clampX(gx+1)][this.clampY(gy+1)])
		

	        for(var j=0; j < objs.length; j++){
	        	var ind2 = objs[j];
	        	if(ind2 ==i){
	        		continue;
	        	}
	        	
	            var body2 = this.objects[ind2];

	            var x = body1.x - body2.x;
	            var y = body1.y - body2.y;
	            var slength = x*x+y*y;
	            if(slength == 0){
	            	slength = 0.0001;
	            }
	            var length = Math.sqrt(slength);
	            var target = body1.radius + body2.radius;

	            // if the spheres are closer
	            // then their radii combined
	            if(length < target){
				    var v1x = body1.x - body1.px;
				    var v1y = body1.y - body1.py;
				    var v2x = body2.x - body2.px;
				    var v2y = body2.y - body2.py;

				    var factor = (length-target)/length;
				    body1.x -= x*factor*0.5 ;
				    body1.y -= y*factor*0.5;
				    body2.x += x*factor*0.5;
				    body2.y += y*factor*0.5;

		            
				    				    
				}
	        }
	    }
	}
	this.add = function(item){
		this.objects.push(item);
	}
	this.draw = function(){
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].draw();
		}
	}
	this.setGravity = function(dir){
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].setGravity(dir);
		}
	}

}
function verletObj(points, springs){
	this.type = "obj";
	this.points = points;
	this.springs = springs;

	this.update = function(){
		
		
		//this.updatePosition();
		for(var i= 0; i < 1;i++){
			this.updateSprings();
		}
		//this.constrain();
		
		
	}
	this.updatePosition = function(){
		for(var i = 0; i < this.points.length; i++){
			this.points[i].update();
		}
		
	}
	this.updateSprings = function(){

		for(var i = 0; i < this.springs.length; i++){
			this.springs[i].update();
		}
	}
	this.constrain = function(){

		for(var i = 0; i < this.points.length; i++){
			this.points[i].constrain();
		}
	}
	this.drawWithLines = function(){
		for(var i = 0; i < this.springs.length; i++){
			this.springs[i].draw();
		}
		for(var i = 0; i < this.points.length; i++){
			this.points[i].draw();
		}
	}
	this.draw = function(){
		stroke("#000000")
		strokeWeight(3);
		fill("#FF5050");
		beginShape();
		for(var i =0; i < this.points.length; i++){
			vertex(this.points[i].x, this.points[i].y);
		}
		endShape(CLOSE);
	}

}

function verletPoint(x, y, bounce = 0.9, friction = 1.0, radius = 0, gravity = {x:0, y:0}){
	this.type = "point";
	this.x=x; 
	this.y=y;
	this.xOld=x;
	this.yOld=y;
	this.radius = radius;
	this.bounce = bounce;
	this.friction = friction;
	this.gravity = gravity;
	this.update = function(){
		var vx = (this.x - this.xOld) * this.friction;
		var vy = (this.y - this.yOld) * this.friction;
		this.xOld = this.x;
		this.yOld = this.y;
		this.x += vx;
		this.y += vy;
		this.y += this.gravity.y;
		this.x += this.gravity.x;
		if(isNaN(this.x)){
			console.log("Failed update")
		}
		
	}
	this.setGravity = function(gravity){
		this.gravity = gravity;
	}
	this.constrain = function(){
		var vx = (this.x - this.xOld) ;
		var vy = (this.y - this.yOld) ;

		if(this.x + this.radius > width){
			this.x = width - this.radius;
			this.xOld = this.x + vx * this.bounce;
		}
		if(this.x - this.radius< 0){
			this.x = 0 + this.radius;
			this.xOld = this.x + vx * this.bounce;
		}
		if(this.y + this.radius> height -5){
			this.y = height - this.radius -5;
			this.yOld = this.y + vy * this.bounce;

		}
		if(this.y - this.radius < 0){
			this.y = 0 + this.radius;
			this.yOld = this.y + vy * this.bounce;
		}
		if(isNaN(this.x)){
			console.log("Failed update")
		}
		
	}
	this.draw = function(){
		noStroke();
		ellipse(this.x, this.y, this.radius*2, this.radius*2);
	}
}
function verletStick(p1, p2, distance, rigid){
	this.type = "stick";
	this.p1 = p1;
	this.p2 = p2; 
	this.distance = distance;
	this.rigid = rigid;
	this.update = function(){

		var dx = this.p1.x - this.p2.x;
		var dy = this.p1.y - this.p2.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		var difference = this.distance - distance;
		var percent = difference / distance / 2;
		var offsetX = dx * percent * this.rigid;
		var offsetY = dy * percent * this.rigid;
		if(difference != 0){
			
		
		}
		
		this.p1.x += offsetX;
		this.p1.y += offsetY;
		this.p2.x -= offsetX;
		this.p2.y -= offsetY;


	}
	this.draw = function(){
		stroke("#FFFFFF")
		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}
function verletBall(x, y, radius, segments, rigid, strength){
	var points  = [];
	for(var i = 0; i < segments; i++){
		var v = createVector(0, radius);
		v.rotate(2* PI * i /segments);
		var p = new verletPoint(v.x + x, v.y + y, 0.9, 0.99);
		points.push(p);

	}
	
	var springs = []
	for(var i = 0; i < points.length; i++){
		var p1 = points [i];
		for(var j = 1; j < strength; j++){
			var p2= points [(i+j)%points.length];
			springs.push(new verletStick( p1,p2, distance(p1, p2), rigid) )
		}
	}


	return new verletObj(points, springs);
}
function verletTree(x, y, depth, da, colors, rigid){
	this.points = [];
	this.sticks =[];
	this.colors = colors;
	this.addPoint = function(x,y, depth, parent){
		var color = this.colors[Math.floor(Math.random()*this.colors.length)];

		this.points.push({x:x, y:y, depth:depth, ind:this.points.length, color: color, parent:parent});
	}

	
	this.addPoints = function(x,y, angle, length, ind, depth){
		this.addPoint(x,y, depth, this.points[ind]);
		this.sticks.push({p1:ind, p2:this.points.length-1, depth:depth})
		var pointsLength = this.points.length -1;
		
		if(depth > 0){
			var vec1 = createVector(0,-length * 0.8).rotate(angle + da);
			var vec2 = createVector(0,-length * 0.8).rotate(angle - da);;
			
			this.addPoints(x + vec1.x, y+ vec1.y, angle + da, length * 0.8, pointsLength, depth-1);
			this.addPoints(x + vec2.x, y+ vec2.y, angle - da, length * 0.8, pointsLength, depth-1);
			if(depth < 4){
				var vec1 = createVector(0,-length * 0.8).rotate(angle + da * 2);
				var vec2 = createVector(0,-length * 0.8).rotate(angle - da * 2);;
				
				this.addPoints(x + vec1.x, y+ vec1.y, angle + da * 2, length* 0.8, pointsLength, depth-1);
				this.addPoints(x + vec2.x, y+ vec2.y, angle - da * 2, length*0.8, pointsLength, depth-1);
				var vec1 = createVector(0,-length * 0.8).rotate(angle + da * 4);
				var vec2 = createVector(0,-length * 0.8).rotate(angle - da * 4);;
				
				this.addPoints(x + vec1.x, y+ vec1.y, angle + da * 4, length* 0.8, pointsLength, depth-1);
				this.addPoints(x + vec2.x, y+ vec2.y, angle - da * 4, length*0.8, pointsLength, depth-1);
				var vec1 = createVector(0,-length * 0.8).rotate(angle + da * 6);
				var vec2 = createVector(0,-length * 0.8).rotate(angle - da * 6);;
				
				this.addPoints(x + vec1.x, y+ vec1.y, angle + da * 6, length* 0.8, pointsLength, depth-1);
				this.addPoints(x + vec2.x, y+ vec2.y, angle - da * 6, length*0.8, pointsLength, depth-1);
			}

		}
		else{
			this.addLeaf(x,y);
		}
		

	}

	this.addLeaf = function (x,y){

	}
	this.update = function(){
		this.verlet.update();
		this.verlet.points[0].x = x;
		this.verlet.points[0].y = y;
		this.verlet.points[1].x = x;
		this.verlet.points[1].y = y -150;
		for(var i = 0; i < this.verlet.points.length; i++){
			
			this.points[i].x = this.verlet.points[i].x;
			this.points[i].y = this.verlet.points[i].y;
		}
	}
	this.click = function(x,y){
		console.log("click");
		for(var i = 1; i < this.verlet.points.length; i++){
			var dx = this.verlet.points[i].x - x;
			var dy = this.verlet.points[i].y - y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if(dist <30){
				this.verlet.points[i].x = x;
				this.verlet.points[i].y = y;

			}

		}
	}
	this.draw = function(){
		
		

		for(var i = 0; i<this.sticks.length; i++){
			stroke("#663300")
			strokeWeight(4 +  this.sticks[i].depth)
			line(this.points[this.sticks[i].p1].x, this.points[this.sticks[i].p1].y, this.points[this.sticks[i].p2].x, this.points[this.sticks[i].p2].y);
		}
		for(var i = 0; i<this.points.length; i++){
			if(this.points[i].depth <1){
				noStroke();
				fill(this.points[i].color);
				ellipse(this.points[i].x, this.points[i].y, 12, 12);
			}
			
		}
		
		
		//this.verlet.drawWithLines();
	}

	this.addPoint(x,y, depth, undefined);
	
	this.addPoints(x,y-150,0, 100, 0, depth);
	var points = []
	for(var i = 0; i < this.points.length; i++){
		
		var p = new verletPoint(this.points[i].x,this.points[i].y, 0.9, 0.99);
		points.push(p);

	}
	
	var springs = []
	for(var i = 1; i <  this.points.length; i++){
		var p1 = this.points[i];
		
		var p2 = p1.parent;
		
		

		
	

		

		
		var count = 5
		while(p2 != undefined && count > 0){
			p1OBJ = points[p1.ind];
			p2OBJ = points[p2.ind];
			var p2 = p2.parent;
			
			springs.push(new verletStick( p1OBJ,p2OBJ, distance(p1OBJ, p2OBJ), 0.5) )
			count--;
		}
		
	}
	this.verlet = new verletObj(points, springs);

}

function verletSquare(x, y, w, h, rigid){
	var points = []
    var p1 = new verletPoint(x-w/2, y - h/2, 0.9, 0.99);
    var p2 = new verletPoint(x+w/2, y-h/2, 0.9, 0.99);
    var p3 = new verletPoint(x+w/2, y+h/2, 0.9, 0.99);
    var p4 = new verletPoint(x-w/2, y + h/2, 0.9, 0.99);
    points.push(p1);
    points.push(p2);
    points.push(p3);
    points.push(p4);
   
    var springs = [];
    var s1 = new verletStick(p1, p2, w, rigid);
    var s2 = new verletStick(p2, p3, h, rigid);
    var s3 = new verletStick(p3, p4, w, rigid);
    var s4 = new verletStick(p4, p1, h, rigid);
    var s5 = new verletStick(p1, p3, Math.sqrt(w * w + h * h), rigid);
    springs.push(s1);
    springs.push(s2);
    springs.push(s3);
    springs.push(s4);
    springs.push(s5);
   
	return new verletObj(points, springs);
}

function distance(p1, p2){
	var x = (p2.x - p1.x );
	var y = (p2.y - p1.y );
	return Math.sqrt(x*x + y*y);
}

