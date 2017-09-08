/*
 * definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxPathSum = function(root) {
    var maxVal = Number.NEGATIVE_INFINITY;
    function helper(n){
        if(!n) return 0;
        
        var lval = helper(n.left);
        var rval = helper(n.right);
        var totalSum = lval + rval + n.val;
        var lTreeSum = lval + n.val;
        var rTreeSum = rval + n.val
        maxVal = max(n.val, maxVal);
        maxVal = max(lTreeSum, maxVal);
        maxVal = max(rTreeSum, maxVal);
        maxVal = max(totalSum, maxVal);
        
        return max(n.val, max(lTreeSum,rTreeSum));
    }
    helper(root);
    return maxVal;
};
function max(x,y){return x > y ? x : y}