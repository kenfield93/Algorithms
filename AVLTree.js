/*
   AVL guarantees a balanced tree by looking at balance factor when inserting nodes and rotating to keep the tree balanced
   if the new insert ruined that property
   BF is  determenined for a tree by suptracting the height of the left subtree from right subtree
   if BF = 0, tree is full, 1 the next level is being filled, >1 means a new level is being added w/o first filling in the
   level above that. We can then rotate to modfiy ttree to bring that node up a level and bring another node down to fill
   one of those spots
   Basic outline:
   Recurse to find where tree goes like vanilla BST and insert. After that the nature of recursion means
    we get to revisit every node on our path we just went on to insert
    so we can calculate the height of each node on the way up by doing doing max of its L/R subtree and adding 1
    to count the new level.
    We then calculate the BF of the node who's heigh we jsut updated and if magnitude is >1 we do some rotations based
    on where in the tree it was inserted (Left subtree of node -> (left of parent vs right of parent) or
    									  Right subtree of node -> (right of parent vs left of parent)
    We also update the rotated nodes using the same max formula
 */
function AVLTree(v, p, l, r, count, h){
	this.value = v ? v : null;
	this.numOfElements = count ? count : 1;
	this.p = p ? p : null;
	this.l = l ? l : null;
	this.r = r ? r : null;
	this.height = h ? h : 0;
}

function insert(root, v){
	if(!root){
		throw Error("root shouldn't be null, you jabronie ");
	}
	var lastRootNode;
	if(v < root.value){
		if(root.l)
			lastRootNode = insert(root.l, v);
		else {
			root.l = new AVLTree(v, root);
			lastRootNode = root.l;
			//return root.l;
		}
	}
	else if(v > root.value){
		if(root.r)
			lastRootNode = insert(root.r, v);
		else{
			root.r = new AVLTree(v, root);
			lastRootNode = root.r;
		//	return root.r;
		}
	}
	else{
		root.numOfElements++;
		return root;
	}

	root.height = maxHeight(root.l, root.r)+1;

	var bf = balanceFactor(root);
	//Assumes magnitutde. > 2 also counts for < -2 and so on
	//if  bf of a tree  is 0 that means the tree is full.
	//if bf of a tree is 1, then its bottom level isn't full, but is in process of filling up
	//if bf of a tree is > 2 then the bottom 2 levels arent full. we can rotate it so that a node
	// goes from that bottom level(essential destroying it) and fills an open spot in the level above
	if(bf >= 2){
		if(isLeftChild(lastRootNode) && lPathIsGreater(lastRootNode) ){
			return rotateRight(lastRootNode);
		}
		var pivot = lastRootNode.r;
		rotateLeft(pivot);
		return rotateRight(pivot);
	}
	if(bf <= -2){
		if(!isLeftChild(lastRootNode) && !lPathIsGreater(lastRootNode)){
			return rotateLeft(lastRootNode);
		}
		var pivot = lastRootNode.l;
		rotateRight(pivot);
		return rotateLeft(pivot);
	}

	// root was balanced so return this node as root of subtree
	// if next root isn't balanced it'll use it as center node for some rotation.
	return root;
}
function lPathIsGreater(n){
	if(!n.l && ! n.r) throw Error("lPathIsGreater: node should always have child since |BF| >= 2");
	if(!n.r) return true;
	if(!n.l) return false;
	if(n.l.height == n.r.height) throw Error("lPathIsGreater: node's subtrees heights should be equal since |BF| >= 2");
	return n.l.height > n.r.height;
}
//hooks grandParent's point to grandchild for rotates.
//rotate takes care of modifying grandChild's pointers, but we also need to change
//grandParents pointers to make grandChild it's direct decendant
function grandchildToChild(grandChild, parent,  grandParent){
	if(!grandParent) return;
	if(isLeftChild(parent)){
		grandParent.l = grandChild;
	}
	else{
		grandParent.r = grandChild;
	}
}

//In terms of updating node height values, it varies depending on tree so we first do centerNode.p
//since centerNode is now parent of that node we need to know it's value first
//we do same max(p.l, p.r) + 1. Only change is from removal of centerNode and possible addition of centerNodes subtree
// then we can do the same update for centerNode
function rotateLeft(centerNode){

	var p = centerNode.p;
	if(!p) throw Error('any node being rotated should have a parent');
	grandchildToChild(centerNode, p, p.p);
	centerNode.p = p.p;
	p.p = centerNode;
	p.r = centerNode.l;
	centerNode.l = p;

	p.height = maxHeight(p.l, p.r) + 1;
	centerNode.height = maxHeight(p.l, p.r) + 1;
	return centerNode;
}
function rotateRight(centerNode){
	var p = centerNode.p;
	if(!p) throw Error('any node being rotated should have a parent');
	grandchildToChild(centerNode, p, p.p);
	centerNode.p = p.p;
	p.p = centerNode;
	p.l = centerNode.r;
	centerNode.r = p;

	p.height = maxHeight(p.l, p.r) + 1;
	centerNode.height = maxHeight(p.l, p.r) + 1;
	return centerNode
}
function isLeftChild(nodeToCheck){
	if(!nodeToCheck.p) throw Error("isLeftChild: node has no parent");
	if(!nodeToCheck.p.l)
		return false;
	return nodeToCheck.value === nodeToCheck.p.l.value;
}
function balanceFactor(root){
	if(!root.r && !root.l) return 0;
	if(!root.l) return 0 - root.height;
	if(!root.r) return root.height;
	return root.l.height - root.r.height;
}
function maxHeight(lTree, rTree){
	if(!lTree && !rTree) return 0;
	if(!lTree) return rTree.height;
	if(!rTree) return lTree.height;
	return lTree.height > rTree.height ? lTree.height : rTree.height;
}

var r = new AVLTree(10);
r = insert(r, 6);
r = insert(r, 8);
r = insert(r,12);

console.log("hi");
