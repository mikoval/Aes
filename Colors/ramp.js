function createRGBRamp(c1, c2, n){

	var arr = [];
	var dr = c2.r - c1.r;
	var dg = c2.g - c1.g;
	var db = c2.b - c1.b;

	for(var i = 0; i <= n; i++){
		var r = c1.r + dr * i/n;
		var g = c1.g + dg * i/n;
		var b = c1.b + db * i/n;
		arr.push({r:r, g:g, b:b});
	}
	
	return arr;
}
function createLABRamp(c1, c2, n){
	
	var arr1 = [c1.r, c1.g, c1.b];
	var arr2 = [c2.r, c2.g, c2.b];
	arr1 = rgb2lab(arr1);
	arr2 = rgb2lab(arr2);

	
	c1 = {l:arr1[0], a:arr1[1], b:arr1[2]};
	c2 = {l:arr2[0], a:arr2[1], b:arr2[2]};

	


	
	var arr = interpolate(c1, c2, n);
	


	return arr;
}
function interpolate(c1, c2,n){
	var arr = [];
	var dl = c2.l - c1.l;
	var da = c2.a - c1.a;
	var db = c2.b - c1.b;

	var PI = 3.14159;
	for(var i = 0; i <= n; i++){
		
		/*
		var l = c1.l + 30 * Math.sin(2*PI * i/n) + dl * i/n;
		var a = c1.a + 15 * Math.sin(4*PI * i/n) + da * i/n;
		var b = c1.b + 30 * Math.sin(6*PI * i/n) + db * i/n;
		*/
		
		var l = c1.l + 5 * ( ( (i + 3) % 6 ) -3)+ dl * i/n;
		var a = c1.a + n * Math.sin(4*PI * i/n) + da * i/n;
		var b = c1.b + n * Math.sin(2*PI * i/n) + db * i/n;
		
		
		var tmp =[ l, a, b];
		tmp  = lab2rgb(tmp);

		arr.push({r:tmp[0], g:tmp[1], b:tmp[2]});
	}
	console.log(arr);
	return arr;
}