#!/bin/bash
git clone https://github.com/koval96/sbor
cd sbor
git checkout install
cd ..
python3 -m venv venv
source venv/bin/activate
source venv/bin/activate
cd sbor
pip3 install -r api/requirements.txt
pip3 install django-tgbot
cd sbor
source venv/bin/activate
python3 api/manage.py runserver &
sleep 6
cd client
npm install
npm start
