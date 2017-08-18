// find each sub sequence for str1, str2 dynamically

find each sub sequence for str1, str2 starting w/ len 1 to len n
for each len iteration check to see if both strings share all the same subsequences, if not return the len ur searching for. Each str takes half of n*n matrix so we can get by by w/ a nxn matrix, or really a nx(n+1) would need to pad need to pad smaller of m,n w/ larger-smaller one though. I wont worry about that right now

function subStrings(str1, str2){
	var s1Len = str1.length, s2Len = str2.length;
	var matrix = new Array(s1Len);
	for( var i = 0; i < s1Len; i++)
		matrix[i] = new Array(s2Len);
		
}