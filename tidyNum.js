

function biggestTidy(n){
	n = (""+n).split("");
	var maxDigits = n.length;
	var len = n.length;
	var ans = [n[len-1]];
	var lastEle = ans[0];
	for( var i = len - 2; i >= 0; i--){
		if(n[i] > lastEle){
			ans = ans.fill(9);
			ans.push(n[i]-1);
			lastEle = n[i] - 1;
		}
		else{
			ans.push(n[i]);
			lastEle = n[i];
		}
	}
	//TODO: just get rid of any trailing 0s
	return ans.reverse().join('');

}
console.log(biggestTidy(2359));
//console.log(biggestTidy(399843972));
//console.log(biggestTidy(111111111111111110));
/*
399843972
398999999

set last ele of answer to last digit of n. look at the next digit and do same. if the next digit is <= to the last one then its fine, else lower by 1 and make everythign to the right 9s 


399843972
		2
	   69
	  899 	
398999999

*/