#!/bin/bash

CURRENT_NAME=${0##*/}
BACKUP_NAME=backup.sh

cat "$CURRENT_NAME" > $BACKUP_NAME

exit
