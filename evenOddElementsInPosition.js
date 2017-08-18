/*Even and odd elements at even and odd positions. problem said order should be maintained. Im interpretting that to mean order of even elements should be maintained, and same for odd, not the entire array

thinking of doing recursion, merger step being where work is done. May need to add padding or fill in padding. If I can do each merger in n time we can get nlogn 
*/
function isEven(x){
	return x % 2 == 0 ? true : false;
}
function isLastEleEven(arr){
	return isEven(arr[arr.length-1]);
}
function evenOdd(arr){
	console.log(arr);
	if(arr.length == 1){
		if(!isEven(arr[0]))
			return [null, arr[0]];
		return arr;
	}
	if(arr.length == 2){
		if(isEven(arr[0]) && !isEven(arr[1]) ) return arr;
		if(!isEven(arr[0]) && isEven(arr[1])) return [arr[1], arr[0]];
		if(isEven(arr[0])) return [arr[0], null, arr[1]]; // 2 evens
		return [null, arr[0], null, arr[1]]; //2 odds
	}
	var breakPoint = Math.floor(arr.length/2);
	var front = evenOdd(arr.slice(0,breakPoint));
	var back = evenOdd(arr.slice(breakPoint));
	return merge(front, back);
}
function merge(front, back){
	var backIndexEven = 0, backIndexOdd = 1;
    for( var i = 0; i < front.length; i++){
   		if(front[i] == null){
   			if(isEven(i)){
   				if(backIndexEven < back.length && back[backIndexEven]){
   					front[i] = back[backIndexEven];
   					back[backIndexEven] = null; 
   					backIndexEven += 2;
   				}
   			}
   			else{
   				if(backIndexOdd < back.length && back[backIndexOdd]){
   					front[i] = back[backIndexOdd];
   					back[backIndexOdd] = null; 
   					backIndexOdd += 2;
   				}   				
   			}
   		}
   }
   // at this point we've already replaced all nulls from front w/ correct values from back. We need to 
   // concat the rest of the 
   var restOfBack = [];
   for( ; backIndexEven < back.length && backIndexOdd < back.length; backIndexEven+= 2, backIndexOdd+= 2){
   		if(isLastEleEven(front)){ 
   			restOfBack.push(back[backIndexOdd]);
   			restOfBack.push(back[backIndexEven]);
   		}
   		else{
   			restOfBack.push(back[backIndexEven]);
   			restOfBack.push(back[backIndexOdd]);
   		}
   }
   // Since even or odd finish first, we add the rest of the opposite values
   if(backIndexEven < backIndexOdd){
   		for(; backIndexEven < back.length; backIndexEven += 2){
   			restOfBack.push(back[backIndexEven]);
   			// so we don't push evens all next to eachother in odd positions 
   			restOfBack.push(null);
   		}
   }
   else{
   		for(; backIndexOdd < back.length; backIndexOdd += 2)
   			restOfBack.push(back[backIndexEven]);
   			// so we don't push odds all next to eachother in even positions
   			restOfBack.push(null);
   }
   return front.concat(restOfBack);	
}
function evenOddValuesInCorespondingPos(arr){
	var a = evenOdd(arr);
	var ans = [], ele = 0;
	for(var i = 0; i < a.length; i++){
		ele = a[i];
		if(ele) ans.push(ele);
	}
	return ans;
}

console.log(evenOddValuesInCorespondingPos([5,8,7,3,8,2,11,12,18]));
