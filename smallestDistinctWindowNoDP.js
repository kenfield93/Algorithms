/*smallest distinct window
1. use hash to get distinct vars called uniqChars
2 look at all concurent substrings of uniqChars.length to size of array
3. return that subarray as soon as you find it since we're starting w/ smallest and going bigger
4. can use dynamic programming for step 2,3 so each subarray doesn't have to be checked everytime
	lets say an iteration found 'acd' at index  4,6, and we just need to find a b. we can use that rather than recalc everything. just keep trac of char/s we need, and possibly length. I dont think length is needed since each outer iteration we're adding a new 1 char to each prev subproblem, meaning subarray is minimal as soon as the  condition is  met  
*/

function smallestDistinctWindow(str){
		var lettersSeen = [];
		var uniqLetters = [];
		for(var i = 0; i < str.length; i++){
			if(!lettersSeen[str[i]]){
				lettersSeen[str[i]] = true;
				uniqLetters.push(str[i]);
			}
		}
		
	
	
		for(var windowSize = uniqLetters.length; windowSize <= str.length; windowSize++){
			for(var windowStart = 0, windowEnd = windowSize; windowEnd <= str.length; windowStart++, windowEnd++){
				if( lettersMissing(uniqLetters, str.substring(windowStart, windowEnd)).length == 0 )
					return windowSize;
			}
		}

	}

	function lettersMissing(uniqLetters, str ){// ,begInd, endInd){
	
		var lettersNotSeen = [];
	
		var uniqLetter;
		for(var i = 0; i < uniqLetters.length; i++){
			uniqLetter = uniqLetters[i];
			for(var j = 0; j < str.length; j++){
				if(str[j] == uniqLetter)
					break;
				if(j == str.length-1)
					lettersNotSeen.push(uniqLetter)
			}
		}
		console.log(lettersNotSeen);
		return lettersNotSeen;
		
	}
console.log(smallestDistinctWindow('aabcbcdbca'));
console.log(smallestDistinctWindow('kjaskfkglhkdjhajhsfghlkjassasdfghjkl'));

