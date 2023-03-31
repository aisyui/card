#!/bin/zsh
inp=mp4
for i in *.${inp}
do
	ffmpeg -i *.${inp} -r 8 %04d.png
done

inp=png
out=jpg
for i in *.${inp}
do
convert ${i%.*}.${inp} -gravity center -crop 825x1080+0+0 ${i%.*}_crop.${inp}
convert ${i%.*}_crop.${inp} -resize 1620x2160! ${i%.*}.${out}
done

nn=`ls *.jpg|wc -l`
static=~/ai/card/static/img
bg=$static/card_bg.png
br=$static/card_br.png
for ((ii=1;ii<=$nn;ii++))
	do
		s=`ls *.jpg|awk "NR==$ii"`
		o=null_${ii}.png
		echo $o
		if [ -f $b ];then
			echo yes
			else
				echo no
		fi
		composite -gravity north  -geometry +0+160 -compose over $s $bg $o.back
		composite -gravity north  -geometry +0+0 -compose over $br $o.back $o
		rm $o.back
done

gif=`ls *.mp4|cut -d . -f 1`.gif
convert -layers optimize -loop 0 -delay 40 null_*.png $gif
rm *.jpg
rm *.png
