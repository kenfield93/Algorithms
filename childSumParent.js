function isLeaf(node){
	return ( !(node.left || node.right) );
}
function childSumParentHelp(root){
	if(!root)
		return {valid: true, sum:0};
 	if( isLeaf(root) )
 		return {valid: true, sum: root.value};		

	lStatus = childSumParentHelp(root.left);
	rStatus = childSumParentHelp(root.right);	

	if(!lStatus.valid || !rStatus.valid)
		return {valid: false};

	if( lStatus.sum + rStatus.sum == root.value)
   		 return {valid: true, sum:root.value }	

   	return {valid: false};		
}
function childSumParent(root){
	return childSumParentHelp(root).valid;
}

var root = {left: {right:{left:{value:3}, value:3}, value:6} , right:{value:2}, value: 8}
console.log(childSumParent(root));