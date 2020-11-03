cd /home/memoryAPI
pip install -r requirements.txt
cd
service nginx start
uwsgi -i /etc/uwsgi/sites/aigaret.ini
/bin/bash
