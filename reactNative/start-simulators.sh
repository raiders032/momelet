#!/bin/bash
declare -a simulators=("69886FDD-B233-4A22-AF42-DB44AC4D8D85" "C68E3FCE-5EFC-49BA-9FF3-919F5F9EBE73" "2E94A1A8-AB14-4156-86FC-F55280C7F5CD")

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    xcrun simctl install $i PATH_TO_EXPONENT_APP
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done