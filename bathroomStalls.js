Array.prototype.dequeu = function (){ 
	if(this.len == 0) return null;
	var x = this[0];
	this.splice(0,1);
	return x;
}
// could more efficient by changing dequeu to mark ele as deleted rather than actualyl deleting and creating new array.
// not sure how efficient splice is.
function bathroomStalls(stalls, people){
	
	// think of stalls as an array, represented by the size, each subarray is just a represented by pushing the size into queue. 
	// We push lenOfRSeq first since itll be bigger when stallSubseq is even. (L and R are equal but we sub 1 from L to count for person using it (rules say chose L on tie) )
	var queue = [stalls];
	var stallSubseq, lenOfLSeq, lenOfRSeq;
	for(var i = 0; i < people; i++){
		stallSubseq = queue.dequeu();
		lenOfRSeq = Math.floor(stallSubseq/2);
		lenOfLSeq = stallSubseq - lenOfRSeq - 1;
		queue.push(lenOfRSeq);
		queue.push(lenOfLSeq);
	}
	return {max:queue[queue.length-2], min:queue[queue.length-1]}
}

console.log(bathroomStalls(4,2));
console.log(bathroomStalls(5,2));
console.log(bathroomStalls(6,2));
console.log(bathroomStalls(1000,1000));
console.log(bathroomStalls(1000,1));