Binary Search Tree
===========

JS implementation of Binary search tree. Only integers supported.


Quick Guide:
`````javascript

	// New instance of the BST. Constructor takes single arg which is the value of the root node.
	var BST = new BinarySearchTree(0);

	// Build random tree with 40 nodes. No return value.
	BST.buildRandomTree(40);

	// Random route through the tree. Returns array of steps.
	console.log(BST.randomRoute());

	//Traverse tree. Returns sorted array of tree's nodes
	console.log(BST.traverse());

	//Insert node into the tree. 
	// Returns true if insertion was successful and false if value already exists in the tree.
	console.log(BST.insert(50));

	// Returns true if a node with given value exists in the tree.
	console.log(BST.checkIfExists(50));

	//Remove node from the tree. Returns true is value was found and removed, false if the value did not exist in the tree.
	console.log(BST.remove(50));

	// Returns max value in the tree
	console.log(BST.findMaxValue());

	// Returns min value in the tree
	console.log(BST.findMinValue());

	// Returns number of nodes in the tree
	console.log(BST.getCount());	

`````
