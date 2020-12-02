#!/bin/bash
#
# install
#


# Stop on errors, print commands
set -Eeuo pipefail
set -x

# Setting up backend Flask and run on 
cd backend 
pip3 install pipenv
pipenv install
pipenv run python3 app.py 