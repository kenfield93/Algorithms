// http://practice.geeksforgeeks.org/problems/predecessor-and-successor/1
function isLeaf(node){
	return ( !(node.left || node.right) );
}

function closestToAndUnderVal(guess1, guess2, value){
	var g1 = value - guess1.value, g2 = value - guess2.value;
	if(g1 < 0 && g2 < 0) return null
	return g1 < g2 ? guess1 : guess2;	
}
//******NOTE*******//
//I think i can just switch < and > signs for maxTakeLPath and maxTakeRPath
function minTakeLPath(n, searchVal){
	if(isLeaf(n)){
		return n.value < searchVal ? n : null ;
	}
	var nextN = n.left;
	if(nextN){
		if(nextN.value > searchVal){
			var guess = minTakeRPath(nextN, searchVal);
			return guess ? guess : nextN.value;
		}
		if(nextN.value < searchVal){
			var guess = minTakeLPath(nextN, searchVal);
			return guess ? guess : n.value;
		}
		if(nextN.value == searchVal)
			return n.value;
	}
	// since im doing min, taking R at this piont is okay
	return minTakeRPath(n,searchVal);
}
function minTakeRPath(n, searchVal){
	if(isLeaf(n)){
		return n.value < searchVal ? n.value : null ;
	}
	var nextN = n.right;
	if(nextN){
		if(nextN.value > searchVal){
			var guess = minTakeLPath(nextN, searchVal);
			return guess ? guess : n.value;
		}
		if(nextN.value < searchVal){
			var guess = minTakeRPath(nextN, searchVal);
			return guess ? guess : nextN.value;
		}
		if(nextN.value == searchVal)
			return n.value;
	}
	return n.value;
}

function getPred(root, value){
	if( value > root.value)
		return minTakeRPath(root, value);
	else
		return minTakeLPath(root, value)

}
var root = {left: {value: 5}, right: {left:{ right:{left:{value:22}, right:{value:27}, value:26}, value: 20}, right:{value:40}, value: 35}, value: 18};
var a = getPred(root, 25);
console.log(a);

/* can do it less efficiently but w/ same O() time by just printing smallest to largest values in sortedArray
   and finding where sortedArray[i] < value < sortedArray[i+1]

   W/ a balanced BST though my way should be O(log(n))
   */

