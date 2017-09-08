/**
 * definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
//Implement as linked list for more better running time. Unshift is probably O(n) for arrays 
function Queue(){
  this.queue = new Array();
}
Queue.prototype.enqueue =  function(v){return Array.prototype.push.call(this.queue, v)};
Queue.prototype.empty = function(){return this.queue.length == 0;}
Queue.prototype.dequeue = function(){return Array.prototype.shift.call(this.queue)};

var LEVEL = 1, NODE = 0;
var levelOrder = function(root) {
    var queue = new Queue;
    var hash = {};
    queue.enqueue([root, 0]);
    var n, l,v;
    while(!queue.empty()){
        n = queue.dequeue();
        l = n[LEVEL];
        n = n[NODE];
        if(n){
            queue.enqueue([n.left,l+1]);
            queue.enqueue([n.right, l+1]);
            if(hash[l] == undefined){ hash[l] = []};
            hash[l].push(n.val);
        }
    }
    var a = [], i = 0;
    while(hash[i] != undefined){
        a[i] = hash[i];
        i++
    }
    return a;
};
