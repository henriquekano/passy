#!/bin/sh
# Example usage
# cd into directory that has @3x images
# ./whatever-you-name-this.sh
# Remember to chmod +x the script

resize () {
	ls *@3x.png | awk '{print("convert "$1" -filter box -resize '$1' "$1)}' | sed 's/@3x/'$2'/2' | /bin/sh	
}

resize 66.67% @2x
resize 33.33% 