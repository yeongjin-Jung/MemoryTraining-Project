#!/bin/bash

cd /home/memoryAPI
pip install -r requirements.txt
cd
service nginx start
uwsgi -i /etc/uwsgi/sites/memorytraining.ini
/bin/bash
