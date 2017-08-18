/*
This is more difficult because it allows for repeated palindromes
  something like aMOMsdsfdbMOMe would count MOM and and underlying palindromes twice

  Issue comes when you see a repeating palindrome that again that during recursion that isn't unique
  ex: aMOMs -> aMOM and MOMs, it shouldn't count thouse twice but should count aMOMs and bMOMe as unique
  Need to keep track of the begginign index and end index and the count that curr str yields i think, 
  to ensure we don't count extra ones(look for overlap of indecies?) and that we remember the count of that substring
*/ 

//NOTE only continguous subsequences and counts duplicates
function palindromicSubsequences(str){
	var memo = [];
	var count = 0;

	//accesses memo/count via clojure
	function recPalHelper(str, startIndex, endIndex){
		if(!str) return;
		console.log("called with : %s ", str);
		if(memo[str+","+startIndex","+endIndex]){
			console.log("already memoized: %s ", str);
			//then already seen but we count douplicates so inc counter
			count++
			return;
		}

		if(isPal(str)){ 
			console.log("seen first time: %s ", str);
			count++;
			memo[str] = true;
		}
		recPalHelper(str.slice(1));
		recPalHelper(str.slice(0,str.length-1));


	}

	recPalHelper(str);
	console.log(count);
	return count;
}

function isPal(str){
	for(var i = 0, j = str.length - 1; i < j; i++, j-- ){
	   if(str[i] != str[j])
	   		return false;
	}
	return true;
}

palindromicSubsequences("aab");