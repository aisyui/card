#!/bin/zsh
d=${0:a:h}
dd=${0:a:h:h}

url=https://syui.ai/img

json=$dd/public/json/card.json
n=`cat $json|jq "length"`
n=`expr $n - 1`

for ((i=0;i<=14;i++))
do
	sid=`cat $json|jq -r ".[$i].src"`
	id=`cat $json|jq -r ".[$i].id"`
	curl -sL $url/${sid}.png -o ~/ai/yui/content/img/${id}.png
done
