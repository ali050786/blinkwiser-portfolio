#!/usr/bin/env bash
# Frees port 3000 (or $PORT), then starts the Next.js dev server.
# Next 16 also refuses to start while another dev server runs from this folder
# on any port, so that one is stopped too.
# Usage: ./startup.sh        or        PORT=3001 ./startup.sh
set -euo pipefail

PORT="${PORT:-3000}"
cd "$(dirname "$0")"

# PIDs *listening* on the port only. Browsers connected to localhost:3000 are left alone.
# lsof is the reliable tool on macOS; fuser covers Linux setups where lsof misses sockets.
listeners() {
  {
    if command -v lsof >/dev/null 2>&1; then
      lsof -ti "tcp:$PORT" -sTCP:LISTEN 2>/dev/null || true
    fi
    if [ "$(uname)" = "Linux" ] && command -v fuser >/dev/null 2>&1; then
      fuser "$PORT/tcp" 2>/dev/null | tr -s ' ' '\n' || true
    fi
  } | grep -E '^[0-9]+$' | sort -u | tr '\n' ' ' | sed 's/ *$//' || true
}

# `next dev` processes (and their next-server children) whose working directory is this folder.
dev_servers() {
  local here pid cwd
  here="$(pwd -P)"
  for pid in $(pgrep -f 'next dev|next-server' 2>/dev/null || true); do
    cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' || true)"
    if [ "$cwd" = "$here" ]; then echo "$pid"; fi
  done | sort -u | tr '\n' ' ' | sed 's/ *$//' || true
}

# Stops what a finder function returns: a clean stop, up to 5 seconds to exit, then forced.
stop_all() {
  local find="$1" what="$2" pids
  pids="$($find)"
  [ -z "$pids" ] && return 0
  echo "$what PID(s): $(echo $pids). Stopping..."
  kill $pids 2>/dev/null || true
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    sleep 0.5
    pids="$($find)"
    [ -z "$pids" ] && break
  done
  if [ -n "$pids" ]; then
    echo "Still running, forcing stop..."
    kill -9 $pids 2>/dev/null || true
    sleep 0.5
  fi
}

stop_all dev_servers "Another dev server for this folder is running as"
stop_all listeners "Port $PORT is in use by"
echo "Port $PORT is free."

if [ ! -d node_modules ]; then
  echo "First run: installing dependencies..."
  npm install
fi

echo "Starting dev server on http://localhost:$PORT"
exec npm run dev -- -p "$PORT"
