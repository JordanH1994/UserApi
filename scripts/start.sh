#!/bin/bash
brew services start postgresql && 
#create a temp user if the user doesn't exist
psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='api'" | grep -q 1 || psql -c "CREATE USER api WITH PASSWORD 'api';" && 
#create a temp database if the database doesn't exist
psql -tAc "SELECT 1 FROM pg_database WHERE datname='api'" | grep -q 1 || psql -c "CREATE DATABASE api;" && 
#dump the sql file into the database 
psql -q -U api -d api -1 -f ./scripts/.setupDatabase.sql &&

S1=$1
if [ -z "$S1" ];
then
				S1='developent'
fi
nodemon app.js $S1