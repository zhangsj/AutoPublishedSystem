ps aux|grep manage.py|grep 8000|awk '{print $2}'|xargs -n 2 kill -9
