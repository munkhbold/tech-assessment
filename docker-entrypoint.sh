#!/bin/bash
sleep 15

PGPASSWORD=E9C52uhcdHZyjepFVzrRYcCScNc84HtQ psql -U postgres -h db -p 5432 myapp < src/database/ticket_order_db.sql

exec "$@"