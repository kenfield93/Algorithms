function min2(x, y){ return (x <= y) ? x: y; }
function min(x,y,z){
	if(!z)
		return min2(x,y);
	return min2(min2(x,y), z);
}
function diff(x,y){
	return x == y ? 0 : 1;
}

//note no subsituting , have to delete then insert 
function minInsertsAndDeletes(w1, w2){

/*
	if( w1.length > w2.length){
		var dif  = w1.length - w2.length;
		while (dif > 0){
			w2.concat(String.fromCharCode(0));
			dif--;
		}
	}
	if( w2.length > w1.length){

	}
	*/
	// matrix rows and columns are plus 1 for comparing " " to w1 and w2 to keep alg. logic consistent 
	var matrix = new Array(w1.length + 1);
	for(var i = 0; i <= w1.length; i++){
		matrix[i] = new Array(w2.length + 1);
	}

	//init first column of matrix for w1
	for( var i = 0; i < matrix.length; i++){
		matrix[i][0] = i;
	}
	//init first row of matrix for w2
	for( var i = 0; i < matrix[0].length; i++){
		matrix[0][i] = i;
	}

	console.log(matrix);
	console.log(matrix[0].length);
	console.log(matrix.length);
	for(var row = 1, w1Index = 0; row < matrix.length; row++, w1Index++){
		for(var col = 1, w2Index = 0; col < matrix[0].length; col++, w2Index++){


			if( w1[w1Index] === w2[w2Index]){
				console.log(w1[w1Index]);
				matrix[row][col] = matrix[row-1][col-1];
			}
			else{
				matrix[row][col] = min(matrix[row-1][col], matrix[row][col-1]) + 1
			}
			
		}
	}

  console.log(matrix);
  return matrix[w1.length][w2.length];
}

var ans = minInsertsAndDeletes( "hager", "hamburger");
console.log(ans);