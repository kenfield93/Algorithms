
// idea for diagonal, keep track of how many L and/or R 'turns' have been taken and group them by that. 
// to print in order rather than return sum[], have a 'curr'
function diagonalSums(root){
	var sums = [];
	function helper(root, numberOfLeftsTaken){
		if(!root) return;
		console.log(root.value);
		sums[numberOfLeftsTaken] += root.value;
		helper(root.right, numberOfLeftsTaken);
		helper(root.left, numberOfLeftsTaken++);
	}
	helper(root, 0)
}