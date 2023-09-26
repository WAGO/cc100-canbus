module.exports = function(RED) {
    //const util = require('util');
    var can = require('socketcan');
    
    //Node: canbus initialize
    //Installs iproute2 if not present and sets up the can Interface
    function CanBusInitialize(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var command; 
        node.on('input', function(msg) {
            command= 'ip -V'
            const { exec } = require('node:child_process')
            //Runs ip -V, gets stderr if iproute2 is not installed
            exec(command, (stderr) => {
                if(stderr){
                    command = 'apk add iproute2 && ip link set can0 type can bitrate ' + msg.payload + ' && ip link set up can0';
                }
                else{
                    command = 'ip link set can0 type can bitrate ' + msg.payload + ' && ip link set up can0'
                }
                exec(command)
                msg.payload = command;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("canbus-initialize",CanBusInitialize);

    //Node: canbus oppertaional
    function CanBusOpperational(config) {
        RED.nodes.createNode(this,config);

        //Create can channel
        var sock;
        sock = can.createRawChannel("can0", true);
        sock.start;

        var node = this;

        //Define Frame
        var frame = {};
        frame.ext = false;
        frame.rtr = false;
        frame.id = 0;
        frame.dlc = 2;
        frame.canfd = false;
        node.on('input', function(msg) {
            //Send frame
            frame.data = Buffer.from([1, msg.payload]);
            sock.send(frame);
        });

        node.on('close', function(){
            sock.stop();
        });
    }
    RED.nodes.registerType("canbus-opperational", CanBusOpperational);

    //Node: canbus stopped
    function CanBusStopped(config) {
        RED.nodes.createNode(this,config);

        //Create can channel
        var sock;
        sock = can.createRawChannel("can0", true);
        sock.start;

        var node = this;

        //Define Frame
        var frame = {};
        frame.ext = false;
        frame.rtr = false;
        frame.id = 0;
        frame.dlc = 2;
        frame.canfd = false;
        node.on('input', function(msg) {
            //Send frame
            frame.data = Buffer.from([2, msg.payload]);
            sock.send(frame);
        });

        node.on('close', function(){
            sock.stop();
        });
    }
    RED.nodes.registerType("canbus-stopped", CanBusStopped);

    //Node: canbus pre-opperational
    function CanBusPreOpperational(config) {
        RED.nodes.createNode(this,config);

        //Create can channel
        var sock;
        sock = can.createRawChannel("can0", true);
        sock.start;

        var node = this;

        //Define Frame
        var frame = {};
        frame.ext = false;
        frame.rtr = false;
        frame.id = 0;
        frame.dlc = 2;
        frame.canfd = false;
        node.on('input', function(msg) {
            //Send frame
            frame.data = Buffer.from([128, msg.payload]);
            sock.send(frame);
        });

        node.on('close', function(){
            sock.stop();
        });
    }
    RED.nodes.registerType("canbus-pre-opperational", CanBusPreOpperational);

    //Node: canbus reset
    function CanBusReset(config) {
        RED.nodes.createNode(this,config);

        //Create can channel
        var sock;
        sock = can.createRawChannel("can0", true);
        sock.start;

        var node = this;

        //Define Frame
        var frame = {};
        frame.ext = false;
        frame.rtr = false;
        frame.id = 0;
        frame.dlc = 2;
        frame.canfd = false;
        node.on('input', function(msg) {
            //Send frame
            frame.data = Buffer.from([129, msg.payload]);
            sock.send(frame);
        });

        node.on('close', function(){
            sock.stop();
        });
    }
    RED.nodes.registerType("canbus-reset", CanBusReset);

    //Node: canbus reset communications
    function CanBusResetCommunications(config) {
        RED.nodes.createNode(this,config);

        //Create can channel
        var sock;
        sock = can.createRawChannel("can0", true);
        sock.start;

        var node = this;

        //Define Frame
        var frame = {};
        frame.ext = false;
        frame.rtr = false;
        frame.id = 0;
        frame.dlc = 2;
        frame.canfd = false;
        node.on('input', function(msg) {
            //Send frame´
            frame.data = Buffer.from([130, msg.payload]);
            sock.send(frame);
        });

        node.on('close', function(){
            sock.stop();
        });
    }
    RED.nodes.registerType("canbus-reset-commmunications", CanBusResetCommunications);
}