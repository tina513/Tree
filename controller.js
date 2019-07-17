const mongoose = require('mongoose');
const Node = require('./dbmodel/node');

const addNode = (io, node) => {
    const newNode = new Node({
        name: node.name,
        count: node.count,
        lower: node.lower,
        higher: node.higher,
        children: generateChildren(node.count, node.lower, node.higher)
    });
    newNode.save((err, node) => {
        if(err){
            console.log(err);
        }else{
            io.emit('nodeAdded');
        }
    });
}

const renameNode = (io, node) => {
    Node.findByIdAndUpdate(node.id, node, {new: true}, (err, result) => {
            if (err) {
                console.log(err);
            }else{
                io.emit('nodeRenamed');
            }
        }
    )
}

const regenerateChild = (io, node) => {
    node.children = generateChildren(node.count, node.lower, node.higher);
    Node.findByIdAndUpdate(node.id, node, {new: true}, (err, result) => {
            if (err) {
                console.log(err);
            }else{
                io.emit('childRegenerated');
            }
        }
    )
}

const deleteNode = (io, id) => {
    Node.remove({_id: id}, (err, result) =>{
        if(err){
            console.log(err);
        }else{
            io.emit('nodeDeleted');
        } 
    });
}

module.exports = {
    addNode,
    renameNode,
    regenerateChild,
    deleteNode
}

function generateChildren(count, lower, higher) {
    let children = [];
    for(let i = 0; i < parseInt(count); i++){
      let random = Math.floor(Math.random() * (parseInt(higher) - parseInt(lower)) + parseInt(lower));
      children.push(random);
    }
    return children;
}