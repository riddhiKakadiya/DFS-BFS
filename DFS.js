function Node(data) { //Constructing a node with data,parent and children
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data) {
  var node = new Node(data); //creating new instance of node
  this._root = node;   //node is assigned as root of the tree
}

Tree.prototype.traverseDF = function(callback) {
  (function recursive(currentNode) { //this function is called recursively for each parent node
      // step 2
      for (var i = 0, length = currentNode.children.length; i < length; i++) {
          // step 3
          recursive(currentNode.children[i]); //Here, each current node acts as parent and looks for his first child
      }

      // step 4
      callback(currentNode); //this calls for callback  
     
      // step 1
  })(this._root); //declares root for next iteration

};

var tree = new Tree('A'); //constructing a tree with root node

tree._root.children.push(new Node('B')); 
tree._root.children[0].parent = tree;

tree._root.children.push(new Node('C')); 
tree._root.children[1].parent = tree;

tree._root.children.push(new Node('D')); 
tree._root.children[2].parent = tree;

tree._root.children[0].children.push(new Node('E'));
tree._root.children[0].children[0].parent = tree._root.children[0];

tree._root.children[0].children.push(new Node('F')); 
tree._root.children[0].children[1].parent = tree._root.children[0];

tree._root.children[2].children.push(new Node('G'));
tree._root.children[2].children[0].parent = tree._root.children[2];

tree.traverseDF(function(node) {
  console.log(node.data)
});