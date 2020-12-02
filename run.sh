#!/bin/bash
#
# run
#


# Stop on errors, print commands
set -Eeuo pipefail
set -x

# Serving server on http://localhost:8000/
python3 -m http.server 8000