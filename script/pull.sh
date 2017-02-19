#!/bin/bash

if [ ! -d /data/.git ]; then
  git clone $REPO /source
fi

cd /data
git checkout $BRANCH
git reset --hard
git pull origin $BRANCH
cd -
