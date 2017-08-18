/*
http://practice.geeksforgeeks.org/problems/largest-sum-subarray-of-size-at-least-k/0
*/
function max(x, y){ return x > y ? x : y;}
//each matrix[i] represents sums of seq of size i from to k-1 to arr.length - 1
//for each matrix[i][j] j represents sum of window where windowEnd = j
//so for size 5 at 0,4 would be found at matrix[4][4], matrix[4][5] would be 1,5 and so on 
function largestSumSubarrayAtLeastSizeK(arr, k){
	var matrix = new Array(arr.length);
	var maxSum = Math.NEGATIVE_INFINITY;
	for(var i = k-1; i < arr.length; i++){
		matrix[i] = new Array(arr.length);
	}
	// Init first row of matrix
    var ogValue = 0;
    for(var i = 0; i < k; i++)
    	ogValue += arr[i];
    matrix[k-1][k-1] = ogValue; // set first val so we can then sub first ele of arr and add the next one
	for(var nextMatrixAndArrEle = k, arrEleToSubIndex = 0; nextMatrixAndArrEle < arr.length; nextMatrixAndArrEle++, arrEleToSubIndex++ ){
		matrix[k-1][nextMatrixAndArrEle] = matrix[k-1][nextMatrixAndArrEle-1] - arr[arrEleToSubIndex] + arr[nextMatrixAndArrEle];
		maxSum = max(maxSum, matrix[k-1][nextMatrixAndArrEle]);
	}
	// done initing first row of matrix 
	
	var windowSize = k;
	for(var windowEnd = k; windowEnd < arr.length; windowEnd++, windowSize++){
		for(var windowStart = windowSize; windowStart < arr.length; windowStart++){
				valueOfSubProblem = matrix[windowEnd-1][windowStart-1] + arr[windowStart];
				matrix[windowEnd][windowStart] = valueOfSubProblem;
				maxSum = max( maxSum, valueOfSubProblem);
		}
	}
	return maxSum;
}

console.log(largestSumSubarrayAtLeastSizeK([-4,-2,1,-3], 2));
console.log(largestSumSubarrayAtLeastSizeK([1, 1, 1, 1, 1, 1], 2));