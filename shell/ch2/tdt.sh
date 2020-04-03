#!/bin/bash

LOG_FNAME='/var/log/systate.log'
NEEDED_UID=0
E_XCD=86
E_NOTROOT=87



if [ -n "$1" ]; then
    LOG_FNAME=$1 
    NEEDED_UID=$UID
fi

if [ "$UID" -ne "$NEEDED_UID" ]; then
    echo "Can't open file(try running with root)"
fi

if [ ! -f "$LOG_FNAME" ]; then
    touch "$LOG_FNAME"
fi

echo "Date: $(date)" >> $LOG_FNAME
echo "Logged in users: $(users)" >> $LOG_FNAME
echo "System uptime: $(uptime)" >> $LOG_FNAME
printf "\n" >> $LOG_FNAME
