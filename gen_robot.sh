#!/bin/bash

echo '# robots.txt for https://mirrors.njupt.edu.cn' > robots.txt
echo 'User-agent: *' >> robots.txt
echo '' >> robots.txt

curl -s https://mirrors.njupt.edu.cn/mirrordsync.json | jq -r '.[] | .name' | uniq | while read name; do
	[[ -z ${name} ]] && continue
	echo "Disallow: /${name}" >> robots.txt
done
