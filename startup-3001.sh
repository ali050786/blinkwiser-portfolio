#!/usr/bin/env bash
# Runs this branch on port 3001, next to main on 3000, for side-by-side review.
# Stops whatever is listening on 3001 first, then starts the dev server there.
# Usage: ./startup-3001.sh
exec env PORT=3001 "$(cd "$(dirname "$0")" && pwd)/startup.sh"
