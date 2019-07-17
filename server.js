const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const socketIO = require('socket.io');
const nodeController = require('./controller');
const Node = require('./dbmodel/node');

const port = 3000;

const app = express();

mongoose.connect('mongodb://tree:sockettree1@ds115035.mlab.com:15035/tree')
.then(() => {
    console.log('Connected');
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '/dist/tree')));

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);

// socket.io connection
io.on('connection', (socket) => {
    console.log("Connected to Socket!!"+ socket.id);
    socket.on('addNode', (node) => {
        nodeController.addNode(io,node);
    });
    socket.on('renameNode', (node) => {
        nodeController.renameNode(io,node);
    });
    socket.on('regenerateChild', (node) => {
        nodeController.regenerateChild(io,node);
    });
    socket.on('deleteNode', (id) => {
        nodeController.deleteNode(io,id);
    });
});

app.get('/api/nodes', (req, res)=>{
    Node.find({}).then((nodes) => {
        res.send(nodes);
    })
});
  

server.listen(port);