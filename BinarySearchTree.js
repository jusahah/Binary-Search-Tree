var BinarySearchTree = function (root_val) {

	// Binary search tree is colleciton of linked lists. Every search / traversal starts at root node.
	
	// Private variable for holding link to the root node.

	var root = new BSTNode(root_val);

	// How many nodes the tree has. Private /internal method

	var findMin = function(startNode) {

		var searcher = function(node) {

			// Min node can be found simply by going left at all junctions.

			if (node.getLeft()) {

				return searcher(node.getLeft());
			}

			// If there is no more nodes at left, then we've found our min!

			else { 

				return node;
			}

		}

		var start = startNode || root;

		return searcher(start);

	}

	// Find max node in the tree. Private / internal method

	var findMax = function(startNode) {

		var searcher = function(node) {

			// Max node can be found simply by going right at all junctions.

			if (node.getRight()) {

				return searcher(node.getRight());
			}

			// If there is no more nodes at right, then we've found our max!

			else { 

				return node;
			}

		}

		var start = startNode || root;

		return searcher(start);

	}
	
	//
	
	// Start of public interface
	
	//
	
	this.getCount = function() {

		return this.traverse().length;

	}

	// Build a sorted array of tree.

	this.traverse = function() {

		var doTraversal = function(node, f) {

			if (!node) {

				return;
			}

			doTraversal(node.getLeft(), f);
			f(node.val);
			doTraversal(node.getRight(), f);

		}

		var sorted_list = [];

		doTraversal(root, function(val) {

			sorted_list.push(val);

		});

		return sorted_list;

	}

	// Insert node to tree. Duplicates can not be inserted.

	this.insert = function(val) {

		if (this.checkIfExists(val)) {

			return false;
		}

		var newNode = new BSTNode(val);

		var findSlot = function(node) { 

			if (node.getRight() && val > node.val) {

				findSlot(node.getRight());
			}

			else if (node.getLeft() && val < node.val) {

				findSlot(node.getLeft());
			}

			else if (val < node.val) {

				node.setLeft(newNode);

			}

			else if (val > node.val) {

				node.setRight(newNode);

			}

		}

		findSlot(root);

		return true;
	}

	// Remove node from tree.
	// Todo: implementing lazy removal, which does not remove nodes, just marks them 'disabled' or something.

	this.remove = function(val) {

		if (!this.checkIfExists(val) || val === root.val) {

			return false;
		}

		var oldNode;

		// Copying current scope for accessing remove method later

		var that = this;

		var findSlot = function(node) {

			if (node.val === val) {

				// Found

				if (!node.hasChildren()) {

					// No kids, so just delete.

					node.val > oldNode.val ? oldNode.setRight(null) : oldNode.setLeft(null);
				}

				else if (node.getRight() && node.getLeft()) {

					// Has two kids.

					var replacer = findMax(node.getLeft());
					var theVal = replacer.val;

					that.remove(replacer.val);

					node.val = theVal;

				}

				else {
					// Has one kid. We must update the pointer from parent node to the kid, skipping the node that is to be removed. 
					// Garbage collection takes care of actual removal.

					var kid = node.getRight() || node.getLeft();

					node.val > oldNode.val ? oldNode.setRight(kid) : oldNode.setLeft(kid);

				}

			}

			else if (val > node.val && node.getRight()) {

				oldNode = node;

				findSlot(node.getRight());
			}

			else if (val < node.val && node.getLeft()) {

				oldNode = node;

				findSlot(node.getLeft());
			}

			else {

				// This clause should not ever run, because we already checked at the top if value exists- 

				throw new Error("The value should be in the tree, but I can not find it. Something clearly went horribly wrong");
			}


		}

		findSlot(root);

		return true;

	}

	// Find min node in the tree.

	// Public Interface / public methods

	this.findMinValue = function() {

		return findMin().val;

	}

	this.findMaxValue = function() {

		return findMax().val;

	}

	// Check if node exists in the tree.

	this.checkIfExists = function(val) {

		var isValue = function(node) {

			if (node.val === val) {

				return true;
			}

			else if (val > node.val && node.getRight()) {

				return isValue(node.getRight());
			}

			else if (val < node.val && node.getLeft()) {

				return isValue(node.getLeft());
			}

			else {

				return false;
			}

		}

		return isValue(root);
	}

	// Builds random tree for testing / demonstration purposes.

	this.buildRandomTree = function(num, min, max) {

		var added = [];

		num = num || 50;
		min = min || 200;
		max = max || 200;

		for (var i = 1; i <= num; i++) {

			var val = Math.round((Math.random() * min) - (Math.random() * max));

			if (this.insert(val) !== false) {

				added.push(val);

			}

		};

		return added;

	}

	// Returns a route to random endpoint node (= node with no children).

	this.randomRoute = function() {

		var steps = [];

		var goRandom = function(node, suunta) {

			steps.push({direction: suunta, node: node.val});

			if (!node.hasChildren()) {

				return;
			}

			direction = Math.random() < 0.5 ? 'left' : 'right';

			var next =  direction === 'left' ? node.getLeft() : node.getRight();

			if (!next) {

				if (direction === 'left') {

					next = node.getRight();
					direction = 'right';
				}

				else if (direction === 'right') {

					next = node.getLeft();
					direction = 'left';

				}

			}

			goRandom(next, direction);

		}

		goRandom(root, 'root');

		return steps;
	}
	
}

// Node constructor

var BSTNode = function(val) {

	this.val = val;
	this.enabled = true;

	this.left = null;
	this.right = null;

	this.getRight = function() {

		return this.right;
	}

	this.getLeft = function() {

		return this.left;
	}

	this.setRight = function(node) {

		this.right = node || null;

	}

	this.setLeft = function(node) {

		this.left = node || null;

	}

	this.hasChildren = function() {

		return this.left !== null || this.right !== null;
	}

}
