#!/bin/bash
export WEBHOOK_ENDPOINT=${WEBHOOK_ENDPOINT:-/webhook}
export BRANCH=${BRANCH:-master}

/data/script/pull.sh


github-webhook  --port=9999 \
  --path=$WEBHOOK_ENDPOINT \
  --secret=$WEBHOOK_SECRET \
  --log=/var/log/webhook.log \
  --rule="push:ref == refs/heads/$BRANCH:/data/script/pull.sh" &

jekyll build --watch &

wait
