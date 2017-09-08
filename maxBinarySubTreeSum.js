/**
   defintion for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */


/* I misunderstood what the Binary Tree Maximum Path Sum question was asking and original came up with this.
   IMO the question wasn't clear, they were looking for Maximum Sum of 2 paths. The example and definition of a path did not make that clear	
*/
var maxBinarySubtreeSum = function(root) {
    var maxVal = Number.NEGATIVE_INFINITY;
    function helper(n){
        if(!n) return 0;
        
        var lval = helper(n.left);
        var rval = helper(n.right);
        var totalSum = lval + rval + n.val;
        var lTreeSum = lval + n.val;
        var rTreeSum = rval + n.val;
        maxVal = max(n.val, maxVal);
        maxVal = max(lTreeSum, maxVal);
        maxVal = max(rTreeSum, maxVal);
        maxVal = max(totalSum, maxVal);
        
        return max(n.val, max(lTreeSum, max(rTreeSum, totalSum)));
    }
    helper(root);
    return maxVal;
};
function max(x,y){return x > y ? x : y}
