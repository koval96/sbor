#!/bin/bash
git clone https://github.com/koval96/sbor
git checkout install
cd sbor
venv/Scripts/activate.bat
pip install -r api/requirements.txt
venv/Scripts/activate.bat
python api/manage.py runserver &
cd client
npm install
npm start
