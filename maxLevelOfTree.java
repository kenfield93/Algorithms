
/*
Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public int maxDepth(TreeNode root) {
        // do breadth first search so we can compare levels
        return getDepth(root, 0);
    }
    
    public int getDepth(TreeNode root, int currLevel){
        if(root == null) return currLevel;
        
        int lDepth =  getDepth(root.left, currLevel + 1);
        int rDepth = getDepth(root.right, currLevel + 1);
        
        return ( lDepth >= rDepth) ? lDepth : rDepth;
    }
}