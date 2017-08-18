/*smallest distinct window
http://practice.geeksforgeeks.org/problems/smallest-distant-window/0
1. use hash to get distinct vars called uniqChars
2 look at all concurent substrings of uniqChars.length to size of array
3. return that subarray as soon as you find it since we're starting w/ smallest and going bigger
4. can use dynamic programming for step 2,3 so each subarray doesn't have to be checked everytime
	lets say an iteration found 'acd' at index  4,6, and we just need to find a b. we can use that rather than recalc everything. just keep trac of char/s we need, and possibly length. I dont think length is needed since each outer iteration we're adding a new 1 char to each prev subproblem, meaning subarray is minimal as soon as the  condition is  met  
*/

//TODO, look into if i even needed to make copies beyond the first inner loop 
function copy(obj){
	var copyObj = {}, prop;
	for ( prop in obj ) {
  		if ( obj.hasOwnProperty( prop ) ) {
   			copyObj[ prop ] = obj[ prop ];
  		}
	}
	return copyObj;
}
function smallestDistinctWindow(str){
		var lettersSeen = [];
		var uniqLetters = [];
		for(var i = 0; i < str.length; i++){
			if(!lettersSeen[str[i]]){
				lettersSeen[str[i]] = true;
				uniqLetters.push(str[i]);
			}
		}
		//init memo, a little unorthodox since we're starting at substrs of  uniqLetter.length and not building it up from size 1
		memo = new Array(str.length - uniqLetters.length + 1);

		var currSubSeq, pastSubSeq;
		var charDiscarded, charAdded
		currSubSeq = lettersMissing(uniqLetters, str.substring(0,uniqLetters.length));
		if(currSubSeq.missing.length == 0) return uniqLetters.length;

		memo[uniqLetters.length] = currSubSeq;
		for(var windowSize = uniqLetters.length; windowSize < str.length ;windowSize++){
			for(var windowStart = 0, windowEnd = windowSize; windowEnd <= str.length; windowStart++, windowEnd++ ){
					// very first iteration, we already inited 
					if(windowSize == uniqLetters.length && windowStart == 0)
						continue; 

					pastSubSeq = memo[windowEnd-1];
					currSubSeq = {missing: pastSubSeq.missing.slice(), freq: copy(pastSubSeq.freq)};
					charDiscarded = str[windowStart-1];
					charAdded = str[windowEnd-1];
				
					if(pastSubSeq.freq[charAdded] == undefined || pastSubSeq.freq[charAdded] == 0){ 
						currSubSeq.missing = pastSubSeq.missing.filter(function(ele){ return ele != charAdded ? true : false;});
						//need to pop off charAdded from pastSubSeq missing list if it's in it
					}
					//each first inner loop needs to only add, not discard since window size has increased
					if(windowStart != 0){
						if(pastSubSeq.freq[charDiscarded] <= 1){
							currSubSeq.missing.push(charDiscarded);
						}
						// update curSubSeq's freq list for the char added and removed
						currSubSeq.freq[charDiscarded]--;
					}
					currSubSeq.freq[charAdded] = ( currSubSeq.freq[charAdded] == undefined) ? 1 : currSubSeq.freq[charAdded]+1;
					
					if(currSubSeq.missing.length == 0) 
						return windowSize;
					memo[windowEnd] = currSubSeq;
			}
		}
	}

	function lettersMissing(uniqLetters, str ){// ,begInd, endInd){
		var lettersNotSeen = [];
		var freq = {};
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
		for( var i = 0; i < str.length; i++)
			freq[str[i]] = (freq[str[i]] == undefined) ? 1 : freq[str[i]]+1;
		return {missing: lettersNotSeen, freq: freq};
	}
console.log(smallestDistinctWindow('aabcbcdbca'));
console.log(smallestDistinctWindow('kjaskfkglhkdjhajhsfghlkjassasdfghjkl'));
