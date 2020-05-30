function multiplyMatrices(matrixA, matrixB) {

	// https://www.mathsisfun.com/algebra/matrix-multiplying.html

	/*

	[ a b c ]   [g h i]   [ ag+bj+cm, ah+bk+cn, ai+bl+co]  
	[ d e f ] * [j k l] = [ dg+ej+fm, dh+ek+fn, di+el+fo]
				[m n o] 

	*/

	// Get the width/height of the resulting matrix.

	var endMatrixRows = matrixA[0].length; 
	var endMatrixColumns = matrixB.length;
	var resultMatrix = [];

	for (var i = 0; i < endMatrixRows; ++i){
		resultMatrix.push([]);	// push a new arr
		
		for (var j = 0; j < endMatrixColumns; ++j){
			resultMatrix[i].push(0);
		}
	}

	console.log(resultMatrix);



}