#!/usr/bin/env bash
# Frees port 3000 (or $PORT), then starts the Next.js dev server.
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

pids="$(listeners)"
if [ -n "$pids" ]; then
  echo "Port $PORT is in use by PID(s): $(echo $pids). Stopping..."
  kill $pids 2>/dev/null || true

  # Give it up to 5 seconds to shut down cleanly, then force it.
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    sleep 0.5
    pids="$(listeners)"
    [ -z "$pids" ] && break
  done
  if [ -n "$pids" ]; then
    echo "Still running, forcing stop..."
    kill -9 $pids 2>/dev/null || true
    sleep 0.5
  fi
fi
echo "Port $PORT is free."

if [ ! -d node_modules ]; then
  echo "First run: installing dependencies..."
  npm install
fi

echo "Starting dev server on http://localhost:$PORT"
exec npm run dev -- -p "$PORT"
