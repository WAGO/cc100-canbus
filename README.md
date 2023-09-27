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

## Nodes
All nodes use the interface `can0` as default. To use a different interface change the name of the interface in the node properties.
### canbus-initalize
Initializes the CAN interface on the device with the given bitrate.<br>
Input: Bitrate of the can network as integer<br>
Output: Command executed by the node as string

### canbus-opperational
Forces the addressed device to transit to the opertaional state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
Input: Address of the device to be addressed

### canbus-stopped
Forces the addressed device to transit to the stopped state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
Input: Address of the device to be addressed

### canbus-pre-opperational
Forces the addressed device to transit to the pre-opertaional state. **Flow has to be deployed after each initialization of the CAN interface.** <br>
Input: Address of the device to be addressed

### canbus-reset
Forces the addressed device to transit to reset. **Flow has to be deployed after each initialization of the CAN interface.** <br>
Input: Address of the device to be addressed

### canbus-reset-communication
Forces the addressed device to transit to reset communications. **Flow has to be deployed after each initialization of the CAN interface.** <br>
Input: Address of the device to be addressed

To address all devices on a network instead of a specific device use 0 as address.

## CAN communictaion
**The CAN interface needs to be initialized, before the other nodes are deployed.**<br>
When the CAN interfaced is initialized again after a reboot of the device, the flow has to be deployed again.<br>
The `can-initialize` node can only be used once to set up the CAN interface. To change the bitrate the device has to be rebooted.<br>

For recieving and sending CAN messages [node-red-contrib-socketcan](https://flows.nodered.org/node/node-red-contrib-socketcan "Socketcan Module") can be used. The name of the interface on the cc100 ist can0. The enabling of the interface is done by the canbus-initialize node.<br>