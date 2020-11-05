FROM hchprog/memorytraining
MAINTAINER hchprog@gmail.com

COPY front-end/build /var/www/memorytraining/build
COPY memoryAPI /home/s03p31b301/memoryAPI
COPY run.sh run.sh

ENTRYPOINT ["./run.sh"]