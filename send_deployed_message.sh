#!/bin/bash
source ./.env

commit_info=$(git log -3 --pretty=format:"%s by %an on %cd" --date=format:'%Y-%m-%d %I:%M %p' | sed 's/^/✴︎ /; G')
hostname=$(hostname)
message="✅ $DOMAIN: new code deployed on $hostname:%0A%0A$commit_info"
curl -s -X POST https://api.telegram.org/bot7708984646:AAH2P5I1-JB637NpxGYGhShVvpPxoJf2hRk/sendMessage -d chat_id=-4541835583 -d text="$message"