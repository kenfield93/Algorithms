function max(x,y){ return x>y ? x : y;}
function maxLevelOfTree(root){
	function helper(root, level){
		if(!root) return level-1;
		return max(helper(root.left, level+1), helper(root.right, level+1))
	};
	return helper(root, 0)

}


var root = {left: {value: 5}, right: {left:{ right:{left:{value:22}, right:{value:27}, value:26}, value: 20}, right:{value:40}, value: 35}, value: 18};
console.log(maxLevelOfTree(root))