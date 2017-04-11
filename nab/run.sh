#!/bin/bash

######################################
# Mediascape zerbitzaria hasieratzeko
#######################################

##################################
# Webezerbitzaria eta SharedState
##################################
kill $(ps aux | grep 'node index.js' | awk '{print $2}')
sudo node index.js &

#######################################
# Multumedia Sincronizazio zerbitzaria
#######################################

kill $(ps aux | grep 'node MotionServer/server/server.js' | awk '{print $2}')
sudo node MotionServer/server/server.js &

#####################################
# Device Profiler server
#####################################
kill $(ps aux | grep 'node deviceProfileServer/server.js' | awk '{print $2}')
sudo node deviceProfileServer/server.js &
