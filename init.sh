#!/bin/sh

export $(grep -v '^#' .env | xargs)

sed -e "s/DB_USER_PLACEHOLDER/$DB_USER/" \
    -e "s/DB_PASSWORD_PLACEHOLDER/$DB_PASSWORD/" \
    -e "s/DB_NAME_PLACEHOLDER/$DB_NAME/" \
    init.sql.template > /docker-entrypoint-initdb.d/init.sql
