/*

Follow up for problem "Populating Next Right Pointers in Each Node".

What if the given tree could be any binary tree? Would your previous solution still work?

Note:

You may only use constant extra space.
For example,
Given the following binary tree,
         1
       /  \
      2    3
     / \    \
    4   5    7
After calling your function, the tree should look like:
         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \    \
    4-> 5 -> 7 -> NULL

*/

/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
var connect = function(root) {
    currNode = root;
    queue = [];
    levelCountQueue = [];
    
    levelCountQueue.push(0);
    level = 0;
    l = r = prevNode = root;
    while( currNode !== null && currNode !== undefined ){
        level = levelCountQueue.shift();

        if( currNode.left !== null && currNode.left !== undefined  ){
            l = currNode.left;
            queue.push(l);
            levelCountQueue.push(level + 1);
        }
        if( currNode.right !== null && currNode.right !== undefined){
            r = currNode.right;
            queue.push(r);
            levelCountQueue.push(level + 1);
        }
        prevNode = currNode;
        currNode = queue.shift();

        if (currNode !== null && currNode !== undefined){
            node = levelCountQueue[0];
            if(node == level)
               prevNode.next = currNode;
        }
    }
};