#! /usr/bin/sh

### 1. open file
### 2. check previous link
### 3. export data
### 4. check next link with github api
### 5. export link
### 6. replace link

cd $HOME/apps-for-linux.github.io/content/apps

repo=$( cat *.md | grep "Download" | cut -c 31-+ | sed -r 's/releases.+//' | sed '$ s/.$//' )

current_version=$(curl -s https://api.github.com/repos/"$repo"/releases/latest | grep "browser_download_url.*AppImage" | cut -d : -f 2,3 | tr -d \")
previous_version=$(grep "Download" | cut -c12- | tr -d '>')

update=$(sed -e 's/$previous_version/$current_version/g' "$filename".md )
