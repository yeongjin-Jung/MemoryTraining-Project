FROM hchprog/memorytraining
MAINTAINER hchprog@gmail.com

COPY front-end/build /var/www/html/
COPY memoryAPI /home/memoryAPI
COPY run.sh run.sh

ENTRYPOINT ["./run.sh"]