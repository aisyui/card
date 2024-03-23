#!/bin/zsh
d=${0:a:h}
dd=${0:a:h:h}

echo "1 : [d]efault(no), [b]lack, [s]ilver"
read

url=syui.ai/img

case $OSTYPE in
	darwin*)
		path_nvm_sh="/opt/homebrew/opt/nvm/nvm.sh";;
	linux*)
		path_nvm_sh="";;
esac

dir=$dd/public/card
static=$dd/public/static/img
json=$dd/public/json/card.json
mkdir -p $dir
mkdir -p $static
n=`cat $json|jq "length"`
n=`expr $n - 1`

case $1 in
	silver|s)
		bg=$static/card_bg_silver.png
		br=$static/card_br.png
		;;
	black|b)
		bg=$static/card_bg_black.png
		br=$static/card_br.png
		;;
	default|d|*)
		bg=$static/card_bg.png
		br=$static/card_br.png
		;;
esac

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
	o=$dir/card_$id.png

	if [ -f $o ];then
		continue
	fi

	if [ ! -f $s ];then
		curl -sL $url/yui_${sid}.png -o $s
	fi

	if [ ! -f $o ] && [ -n "`echo $s|grep ai_model`" ];then
		model_card=$dir/${sid}.png
		model_webp=$dir/${sid}.webp
		cp -rf $model_card $o
		squoosh-cli --webp '{"quality":100}' -d ./ --resize '{width:825,height:1080}' $o
	fi

	if [ ! -f $o ];then
	#if [ ! -f $o ] && [ -z "`echo $s|grep ai_model`" ];then
		composite -gravity north  -geometry +0+160 -compose over $s $bg $o.back
		composite -gravity north  -geometry +0+0 -compose over $br $o.back $o
		squoosh-cli --webp '{"quality":100}' -d ./ --resize '{width:825,height:1080}' $o
		rm $o.back
	fi
	
done
