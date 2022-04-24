#!/bin/bash
git clone https://github.com/koval96/sbor
cd sbor
git checkout install
source venv/bin/activate
source venv/bin/activate
pip install -r api/requirements.txt
source venv/bin/activate
python api/manage.py runserver &
cd client
npm install
npm start
