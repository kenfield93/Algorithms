/*
let arr [0-n] we want to LIS(0) + LIS(1,n) recursivley, meaning we need to know LIS(i+1) before LIS(i) so for 
iterating we want to start from the end of the array and work backwards. Keeping track of the length and possibly having to back track to find the element value that that is greater than arr[i] and has the largest LIS value
*/

function longestIncreasingSubsequence(arr){
	var max = 0;
	var len = arr.length;
	var memo = new Array(len);
	for( i = 0; i < len; i++)
		memo[i] = 0;
	for(var i = len-1; i >= 0; i--){
		var indexOfNextLIS = getIndexOfNextLargestValidSequence(arr[i], i);

		memo[i] = memo[indexOfNextLIS]  + 1;
		max = memo[i] > max ? memo[i] : max;
	}	

	return max;

	function getIndexOfNextLargestValidSequence( valToCompare, startIndex){
		indexOfMaxSeqVal = startIndex;
		var max = 0;
		for( var i = startIndex + 1; i < len; i++){
			if (valToCompare < arr[i] ){
				if( memo[i] > max){ 
					max = memo[i];
					indexOfMaxSeqVal = i;
				}
			}
		}
		return indexOfMaxSeqVal;
	}
}
var answer = longestIncreasingSubsequence([10, 22, 9, 33, 21, 50, 41, 60]);
console.log(answer);
	console.log("fin");