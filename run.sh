#!/bin/bash

export DATABASE_URL=mysql://$MYSQL_USER:$MYSQL_PASSWORD@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DBNAME
echo "DATABASE_URL = $DATABASE_URL"

npm run start:migrate:prod