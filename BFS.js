//Defining function as Node
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
//Defining Constructor Tree

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

// Addding root Node
var tree = new Tree('A');
 //level two
tree._root.children.push(new Node('B'));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node('C'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('D'));
tree._root.children[2].parent = tree;
 //level three
tree._root.children[0].children.push(new Node('E'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('F'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('G'));
tree._root.children[2].children[0].parent = tree._root.children[2];
 
//TraverseBF function
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
     
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
//callback traverseBF
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
//contains method
tree.contains(function(node){
    if (node.data === 'one') {
        console.log(node);
    }
}, tree.traverseBF);

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
//remove method
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
tree.traverseBF(function(node) {
    console.log(node.data);
});
//defining queue
function Queue() {
this.dataStore = [];
this.enqueue = function enqueue(element) {
this.dataStore.push(element);
};
this.dequeue = function dequeue() {
return this.dataStore.shift();
};
this.front = function front() {
return this.dataStore[0];
};
this.back = function back() {
return this.dataStore[this.dataStore.length - 1];
};
}