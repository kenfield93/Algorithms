/*get value of every subsequence denoted by firstIndex(fI), lastIndex(lI)
then try and combine different contiquous subsequences but subtract the value of the second FirstIndex
ex: [2,5,6,-2,3] sum:14  [-4,3,2,6] sum:7  
if(14+7 > 14) then if  (14 + 7 - 4) //note -4 is first index of seconds sequnce//

1)
0,1 -> 7
1,2 -> 11
2,3 -> 4
3,4 -> 1

2)

0,1 + 1,2 - 1 	
 7  + 11  - 5 = 13
1,2 + 2,3 - 2
 11 +  4  - 6 = 9
2,3 + 3,4 - 3
 4  +  1  -(-2) = 7  

 0,2 = 13
 1,3 = 9
 2,4 = 7

3)
0,2 + 1,3 - 1,2
 13 +  9  - 11  = 11
1,3 + 2,4 - 2,3
 9  +  7  - 4   = 12   

0,3 = 11
1,4 = 12

4)
0,3 + 1,4 - 1,3 = 
 11 + 12  - 9 = 14

 0,4 = 14

5)
 set max to -INF 
 then take out smallest value of each interval you just calculated, take the max of curr interval or curr interval - min and set as new max if its greater than curr
 return that value

*/
function max(a, b){
	var maxVal = a > b ? a : b;
	return maxVal;
}
function minElementInInterval(array, startIndex, endIndex){

	var min = Number.POSITIVE_INFINITY;
	for(var i = startIndex; i <= endIndex; i++){
		min = array[i] < min ? array[i] : min;
	}
	return min;
}

function maxSumSeqMinus1Element(arr){
	var matrix = new Array(arr.length + 1);
	for(var i =0; i < matrix.length; i++){
		//+1 is extra room to make alg uniform and prevent special case for first set of subproblems
		matrix[i] = new Array(arr.length );
	}
	for( var i = 0; i < arr.length; i++){
		matrix[0][i] = 0;
		matrix[1][i] = arr[i];
	}

	var maxSum = Number.NEGATIVE_INFINITY;
	var tmpMax;
	var minValueOfSeq;
	var begIndex, endIndex;
	var newStart = 1;
	for( var i = 2; i < matrix.length; i++ ){
		begIndex = 0;
		endIndex = newStart;
		for( var j = newStart; j < matrix[0].length; j++){
			matrix[i][j] = matrix[i-1][j-1] + matrix[i-1][j] - matrix[i-2][j-1];
			// find correct interval(set begIndex, endIndex outside this for loop)
			
			// find min from that interval
			minValueOfSeq = minElementInInterval(arr, begIndex, endIndex);
			// take max of matrix[i][j] and matrix[i][j] - min from interval in array
			tmpMax = max( matrix[i][j], matrix[i][j] - minValueOfSeq);
			// if the max of those 2 set as new max
	        maxSum = tmpMax > maxSum ? tmpMax : maxSum;
			begIndex++;
			endIndex++;
		}
		newStart++;
	}
	console.log(maxSum)
	return maxSum;
}

maxSumSeqMinus1Element([-2, -3, 4, -1, -2, 1, 5, -3]);
