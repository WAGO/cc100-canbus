# cc100-canbus
This repository contains a Node-RED module with nodes to initialize the CAN interface on a CC100 and send CANOpen NMT protocols.

## Compatibility
This Node-RED package works with alpine based docker containers using the apk package manager.<br>
It has been tested the following docker images:<br>
- [nodered/node-red](https://hub.docker.com/r/nodered/node-red "Node-RED")<br>
- [wagoautomation/node-red-cc100](https://hub.docker.com/r/wagoautomation/node-red-cc100 "Node-RED CC100")

## Usage
To use the CAN interface of the cc100 the flag `--network=host` has to be used in the `docker run` command, which makes the port forwarding obsolete.
```
docker run -d \
--name node-red \
--restart always \
--privileged=true \
--user=root \
--network=host \
-v node_red_user_data:/data \
nodered/node-red
```
To install the module in Node-RED use the palette or npm install @wago/cc100-canbus.
## Nodes
All nodes use the interface `can0` as default. To use a different interface change the name of the interface in the node properties.<br>
### canbus-initalize
Initializes the CAN interface on the device with the given bitrate.<br>
<a href="kbus-daemon gif"><img src=images/canbus-initialize.png></a><br>
Input: Bitrate of the can network as integer<br>
Output: Command executed by the node as string

### canbus-opperational
Forces the addressed device to transit to the opertaional state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
<a href="kbus-daemon gif"><img src=images/canbus-operational.png></a><br>
Input: Address of the device to be addressed as integer.

### canbus-stopped
Forces the addressed device to transit to the stopped state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
<a href="kbus-daemon gif"><img src=images/canbus-stopped.png></a><br>
Input: Address of the device to be addressed as integer.

### canbus-pre-opperational
Forces the addressed device to transit to the pre-opertaional state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
<a href="kbus-daemon gif"><img src=images/canbus-pre-operational.png></a><br>
Input: Address of the device to be addressed as integer.

### canbus-reset
Forces the addressed device to transit to reset. **Flow has to be deployed after each initialization of the CAN interface.** <br>
<a href="kbus-daemon gif"><img src=images/canbus-reset.png></a><br>
Input: Address of the device to be addressed as integer.

### canbus-reset-communication
Forces the addressed device to transit to reset communications. **Flow has to be deployed after each initialization of the CAN interface.** <br>
<a href="kbus-daemon gif"><img src=images/canbus-reset-communications.png></a><br>
Input: Address of the device to be addressed as integer.

To address all devices on a network instead of a specific device use 0 as address.

## CAN communictaion
**The CAN interface needs to be initialized, before the other nodes are deployed.**<br>
When the CAN interfaced is initialized again after a reboot of the device, the flow has to be deployed again.<br>
The `can-initialize` node can only be used once to set up the CAN interface. To change the bitrate the device has to be rebooted.<br>

For recieving and sending CAN messages [node-red-contrib-socketcan](https://flows.nodered.org/node/node-red-contrib-socketcan "Socketcan Module") can be used. The name of the interface on the cc100 ist can0. The enabling of the interface is done by the canbus-initialize node.<br>

## Node-RED flow
An example flow using 500000 as a bitrate and addressing device 10 with the NMT commands.
```
[
    {
        "id": "f6f2187d.f17ca8",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "58540408bfda88c1",
        "type": "canbus-initialize",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 380,
        "y": 100,
        "wires": [
            [
                "c426c59f83e55fbc"
            ]
        ]
    },
    {
        "id": "5c4fdeb911b1908c",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "500000",
        "payloadType": "num",
        "x": 170,
        "y": 100,
        "wires": [
            [
                "58540408bfda88c1"
            ]
        ]
    },
    {
        "id": "c426c59f83e55fbc",
        "type": "debug",
        "z": "f6f2187d.f17ca8",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 600,
        "y": 100,
        "wires": []
    },
    {
        "id": "d69aa36bf15f1ffe",
        "type": "canbus-pre-opperational",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 410,
        "y": 220,
        "wires": []
    },
    {
        "id": "36dd2a984bed6bd6",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10",
        "payloadType": "num",
        "x": 170,
        "y": 220,
        "wires": [
            [
                "d69aa36bf15f1ffe"
            ]
        ]
    },
    {
        "id": "b193cb290857ddc4",
        "type": "canbus-opperational",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 400,
        "y": 160,
        "wires": []
    },
    {
        "id": "35384ffb4ce24eae",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10",
        "payloadType": "num",
        "x": 170,
        "y": 160,
        "wires": [
            [
                "b193cb290857ddc4"
            ]
        ]
    },
    {
        "id": "d9f1b5aa4e5e1add",
        "type": "canbus-stopped",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 380,
        "y": 280,
        "wires": []
    },
    {
        "id": "8e539c1d7089b6a0",
        "type": "canbus-reset",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 370,
        "y": 340,
        "wires": []
    },
    {
        "id": "b8917ce1338684c3",
        "type": "canbus-reset-commmunications",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "interface": "can0",
        "x": 430,
        "y": 400,
        "wires": []
    },
    {
        "id": "0a3a052a9978e769",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10",
        "payloadType": "num",
        "x": 170,
        "y": 280,
        "wires": [
            [
                "d9f1b5aa4e5e1add"
            ]
        ]
    },
    {
        "id": "3a33c7577deda244",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10",
        "payloadType": "num",
        "x": 170,
        "y": 340,
        "wires": [
            [
                "8e539c1d7089b6a0"
            ]
        ]
    },
    {
        "id": "dc3bf31a92bda73a",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10",
        "payloadType": "num",
        "x": 170,
        "y": 400,
        "wires": [
            [
                "b8917ce1338684c3"
            ]
        ]
    }
]
```