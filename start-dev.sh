#!/bin/bash

screenname=$1
function cleanup {
    echo
    echo "killing screen"
    screen -S "$screenname" -X quit
}

screen -S "$screenname" -d -m bash -c "cd dndcompendium && npm run dev"
trap cleanup EXIT

(cd dndapi && npm run dev) 


