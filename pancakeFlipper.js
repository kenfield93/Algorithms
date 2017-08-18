 //https://code.google.com/codejam/contest/3264486/dashboard#s=p0
 function oversizedPancakeFlipper(pancakeStr, sizeOfFlipper){
 	var numFlips = 0;
 	var pancakeArray = pancakeStr.split('').map(function(ele){return ele == '+' ? true : false;});
 	console.log(pancakeArray);
 	for(var i = 0; i < pancakeArray.length; i++){
 		if(!pancakeArray[i])	
 			if(flip(pancakeArray, sizeOfFlipper, i))
 				numFlips++;
 		console.log(pancakeArray);
 	}
 	for(var i = 0; i < pancakeArray.length; i++){
 		if(!pancakeArray[i])
 			return -1;
 	}
 	return numFlips;
 }
 function flip(arr, sizeOfFlipper, startIndex){
 	var endIndex = sizeOfFlipper+startIndex-1;
 	if(endIndex >= arr.length) return false;
 	for(var i = startIndex; i <= endIndex; i++)
 		arr[i] = !arr[i];
 	return true;
 }

 console.log(oversizedPancakeFlipper("---+-++-", 3));