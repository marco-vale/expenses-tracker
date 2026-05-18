#!/bin/sh
cd "$(dirname "$0")"
(cd client && npm run dev) &
(cd server && npm run dev) &
trap 'kill 0' INT TERM
wait
