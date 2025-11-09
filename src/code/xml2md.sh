#! /usr/bin/bash

license=$(awk -F '[<>]' '/project_license/{print $3}' ./data/*.appdata.xml)
author=$(awk -F '[<>]' '/developer_name/{print $3}' ./data*.appdata.xml | head -n1)
bugtracker=$(awk -F '[<>]' '/bugtracker/{print $3}' ./data*.appdata.xml)
donation=$(awk -F '[<>]' '/donation/{print $3}' ./data*.appdata.xml)
homepage=$(awk -F '[<>]' '/homepage/{print $3}' ./data*.appdata.xml)
source=$(awk -F '[<>]' '/vcs-browser/{print $3}' ./data*.appdata.xml)
contribute=$(awk -F '[<>]' '/contribute/{print $3}' ./data*.appdata.xml)
screenshot=$(awk -F '[<>]' '/image/{print $3}' ./data*.appdata.xml | grep https | head -n1)
summary=$(awk -F '[<>]' '/summary/{print $3}' ./data*.appdata.xml | head -n1)
title=$(awk -F '[<>]' '/id/{print $3}' ./data*.appdata.xml | head -n1 | sed 's/\.*\./&\n/g'| sed -n 3p | tr -d '.' )
# gh_download=$(curl -s https://api.github.com/repos/"$source"/releases/latest | grep "browser_download_url.*AppImage" | cut -d : -f 2,3 | tr -d \"))
# screenshot=$(cat ./data*.appdata.xml | grep "<image>" | head -n1 | tr -d '<>,' | cut -c5- )

cat <<EOF> /content/apps/$title.md

---
title: $title
description: |
 $summary
pubDate:
categories:
authors: $author
license: $license
draft: false
---

{{< carousel images="{$screenshot}" >}}

$summary
 
License: $license

Web page: $homepage
Source code: <$source>

Become a sponsor: <$donation>
Translate: 
Report the bug: <$bugtracker>

{{< button href="<https://>" target="_blank">}}
Download
{{< /button >}}

EOF
