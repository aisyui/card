#!/bin/zsh
d=${0:a:h}
dd=${0:a:h:h}

url=syui.ai/img

case $OSTYPE in
	darwin*)
		path_nvm_sh="/opt/homebrew/opt/nvm/nvm.sh";;
	linux*)
		path_nvm_sh="";;
esac

dir=$dd/public/card
static=$dd/static/img
json=$dd/public/json/card.json
mkdir -p $dir
mkdir -p $static
n=`cat $json|jq "length"`
n=`expr $n - 1`
bg=$static/card_bg_origin.png
br=$static/card_br.png

cd $dir
export NVM_DIR="$HOME/.nvm"
[ -s "$path_nvm_sh" ] && \. "$path_nvm_sh"
nvm use 17
nvm i squoosh-cli

for ((i=0;i<=$n;i++))
do
	p=`cat $json|jq -r ".[$i].p"`
	sid=`cat $json|jq -r ".[$i].src"`
	s=$static/${sid}.png
	id=`cat $json|jq -r ".[$i].id"`
	o=$dir/card_origin_${id}.png

	if [ -f $o ];then
		continue
	fi

	if [ ! -f $s ];then
		curl -sL $url/yui_${sid}.png -o $s
	fi

	if [ ! -f $o ] && [ -z "`echo $s|grep ai_model`" ];then
		composite -gravity north  -geometry +0+160 -compose over $s $bg $o.back
		composite -gravity north  -geometry +0+0 -compose over $br $o.back $o
		squoosh-cli --webp '{"quality":100}' -d ./ --resize '{width:825,height:1080}' $o
		rm $o.back
	fi

done
