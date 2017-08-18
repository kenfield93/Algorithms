/*

start 'guessing' max of subarrays of size 1 to size k, while also keeping a max variable so we dont have to 
 search the matrix at the end for it
init matrix for size 1 and 
 then for size 2+ use 'sliding window' of size 2 <= k start index 0,1; do sum of (0) + value at index 1
 for say size 6, we start by wanting 0,5; we can use sum of (0,4) and just add value at index 5
*/
function max(x, y){ return x > y ? x : y;}

//each matrix[i] represents sums of seq of size i from 0 to k-1
//for each matrix[i][j] j represents sum of window where windowEnd = j
//so for size 5 at 0,4 would be found at matrix[4][4], matrix[4][5] would be 1,5 and so on 
function largestSumSubarrayAtMostSizeK(arr, k){
	var matrix = new Array(arr.length);
	var maxSum = Math.NEGATIVE_INFINITY;
	for(var i = 0; i < arr.length; i++){
		matrix[i] = new Array(arr.length);
		// init ele of size 1 here
		matrix[0][i] = arr[i];
		maxSum = max(maxSum, arr[i]);
	}
	console.log(matrix);
	for(var windowEnd = 1; windowEnd < k; windowEnd++){
		for(var windowStart = 0; windowStart < arr.length-1; windowStart++){
				valueOfSubProblem = matrix[windowEnd-1][windowStart] + arr[windowStart+1];
				console.log(valueOfSubProblem);
				matrix[windowEnd][windowStart+1] = valueOfSubProblem;
				maxSum = max( maxSum, valueOfSubProblem);
		}
	}
	return maxSum;
}

console.log(largestSumSubarrayAtMostSizeK([-4,-2,1,-3], 2));
console.log(largestSumSubarrayAtMostSizeK([1, 1, 1, 1, 1, 1], 2));