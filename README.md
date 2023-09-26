# cc100-canbus
This repository shows how the CAN intferface of the cc100 can be integrated into Node-RED.

## Compatibility
This Node-RED package works with alpine based docker containers using the apk package manager.<br>
It has been tested the following Node-RED images:<br>
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

## Nodes
### canbus-initalize
Input: Baudrate of the can network as integer<br>
Output: Command executed by the node as string

### canbus-opperational
Input: Address of the device to be addressed

### canbus-stopped
Input: Address of the device to be addressed

### canbus-pre-opperational
Input: Address of the device to be addressed

### canbus-reset
Input: Address of the device to be addressed

### canbus-reset-communication
Input: Address of the device to be addressed

#### To address all devices on a network instead of a specific device use 0 as address.

## General CAN communictaion
For recieving and sending CAN messages [node-red-contrib-socketcan](https://flows.nodered.org/node/node-red-contrib-socketcan "Socketcan Module") can be used. The name of the interface on the cc100 ist can0. The enabling of the interface is done by the canbus-initialize node.

