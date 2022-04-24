#!/bin/bash
git clone https://github.com/koval96/sbor
git checkout install
cd sbor
source venv/bin/activate
source venv/bin/activate
pip install -r api/requirements.txt
source venv/bin/activate
python api/manage.py runserver &
cd client
npm install
npm start
