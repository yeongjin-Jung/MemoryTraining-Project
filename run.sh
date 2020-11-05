#!/bin/bash

cd /home/s03p31b301/memoryAPI
pip install -r requirements.txt
cd
service nginx start
uwsgi -i /etc/uwsgi/sites/memorytrain.ini
/bin/bash
