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
	console.log(arr);
	return arr;
}
function createLABRamp(c1, c2, n){
	
	var arr1 = [c1.r, c1.g, c1.b];
	var arr2 = [c2.r, c2.g, c2.b];
	arr1 = rgb2lab(arr1);
	arr2 = rgb2lab(arr2);
	tmp  = lab2rgb(arr1);
	console.log(tmp);

	
	c1 = {r:arr1[0], g:arr1[1], b:arr1[2]};
	c2 = {r:arr2[0], g:arr2[1], b:arr2[2]};

	

	var arr = [];
	var dr = c2.r - c1.r;
	var dg = c2.g - c1.g;
	var db = c2.b - c1.b;

	for(var i = 0; i <= n; i++){

		var r = c1.r + dr * i/n;
		var g = c1.g + dg * i/n;
		var b = c1.b + db * i/n;

		var tmp =[ r, g, b];
		tmp  = lab2rgb(tmp);
		console.log(tmp);

		arr.push({r:tmp[0], g:tmp[1], b:tmp[2]});
	}

	console.log(arr);
	return arr;
}