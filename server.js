const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const socketIO = require('socket.io');
const nodeController = require('./controller');
const Node = require('./dbmodel/node');
const User = require('./dbmodel/user');
const Joi = require('@hapi/joi');

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://tree:sockettree1@ds115035.mlab.com:15035/tree', { useFindAndModify: false, useNewUrlParser: true })
.then(() => {
    console.log('Connected');
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '/dist/tree')));

const schema = Joi.object().keys({
    id: Joi.string().alphanum(),
    name: Joi.string(),
    count: Joi.number().max(15),
    lower: Joi.number(),
    higher: Joi.number().greater(Joi.ref('lower'))
})

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);

// socket.io connection
io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
        debugger;
        jwt.verify(socket.handshake.query.token, 'user-secret', function(err, decoded) {
        if(err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
        });
    } else {
        debugger;
        next(new Error('Authentication error'));
    }    
})
.on('connection', (socket) => {
    console.log("Connected to Socket!!"+ socket.id);
    socket.on('addNode', (node) => {
        Joi.validate(node, schema, function (err, value) {
            if(err){
                console.log(err.message);
            }else{
                nodeController.addNode(io,node);
            }
        });
    });
    socket.on('renameNode', (node) => {
        Joi.validate(node, schema, function (err, value) {
            if(err){
                console.log(err.message);
            }else{
                nodeController.renameNode(io,node);
            }
        });
    });
    socket.on('regenerateChild', (node) => {
        debugger;
        Joi.validate(node, schema, function (err, value) {
            if(err){
                console.log(err.message);
            }else{
                nodeController.regenerateChild(io,node);
            }
        });
    });
    socket.on('deleteNode', (id) => {
        if(!id){
            console.log("Error: id is incorrect - " + id); 
        }else{
            nodeController.deleteNode(io,id);
        }
    });
    socket.on('end', function (){
        socket.disconnect();
    });
}, {'sync disconnect on unload': true});

app.get('/api/nodes', (req, res)=>{
    Node.find({}).then((nodes) => {
        res.send(nodes);
    })
});

app.post('/api/signup', (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save((err, user) => {
        if(err){
            let str = err.message.split('$')[1].split('_')[0];
            res.send({error: `${str} already exist, please use a different one`});
        }else{
            var token = jwt.sign({userID: user.id}, 'user-secret', {expiresIn: '2h'});
            res.send({token});
        }
    });
});

app.post('/api/login', (req, res)=>{
    debugger;
    User.findOne ({username: req.body.username}).exec((err, user) => {
        if(err){
            res.send({error: err});
        }
        if(!user){
            res.send({error: "Username not found"});
        }else{
            if(user.password !== req.body.password){
                res.send({error: "Password is incorrect"});
            }else{
                var token = jwt.sign({userID: user.id}, 'user-secret', {expiresIn: '2h'});
                res.send({token});
            }
        }
    });
});

server.listen(port);