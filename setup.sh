#!/bin/sh
## Add error handling
set -e
set -u
## Add logging

## get the current user
USER=`whoami`
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Using $CURRENT_DIR as working directory"

if ! which node > /dev/null; then
    echo "Node not found in PATH. Please install nodejs first"
    exit 1
fi

if ! which npm > /dev/null; then
    echo "Npm not found in PATH. Please install npm first"
    exit 1
fi

if [ ! -f .env ]; then
    echo "Creating .env file"
    touch .env
fi

if [ ! -d logs ]; then
    echo "Creating logs directory"
    mkdir logs
fi
 
 > .env

 ## Ask for the PORT value
read -p "What port do you want deployer to run? (default 3005): " PORT
if [ -z "$PORT" ]; then
    PORT=3005
fi
echo "PORT=$PORT" >> .env

read -p "What is your deployer host? (default localhost): " HOST
if [ -z "$HOST" ]; then
    HOST=localhost
fi
echo "HOST=$HOST\n" >> .env

read -p "What is your database client? (default mysql): " DB_CLIENT
if [ -z "$DB_CLIENT" ]; then
    DB_CLIENT=mysql
fi
echo "DB_CLIENT=$DB_CLIENT" >> .env

read -p "What is your database host? (default localhost): " DB_HOST
if [ -z "$DB_HOST" ]; then
    DB_HOST=localhost
fi
echo "DB_HOST=$DB_HOST" >> .env

read -p "What is your database username? (default $USER): " DB_USER
if [ -z "$DB_USER" ]; then
    DB_USER=$USER
fi
echo "DB_USER=$DB_USER" >> .env

read -p "What is your database password? (default $USER): " DB_PASSWORD
if [ -z "$DB_PASSWORD" ]; then
    DB_PASSWORD=$USER
fi
echo "DB_PASSWORD=$DB_PASSWORD" >> .env

read -p "What is your database name? (default deployer): " DB_NAME
if [ -z "$DB_NAME" ]; then
    DB_NAME=deployer
fi
echo "DB_SCHEMA=$DB_NAME" >> .env

echo "Installing dependencies"
npm install --no-audit --no-fund

echo "Installing $DB_CLIENT driver"
npm install --no-audit --no-fund $DB_CLIENT

echo "Testing database connection"
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME"

echo "Running migrations"
npx knex migrate:latest --env=production

## Run the bin/dep node script
echo "Create a new user"
node bin/dep

if ! which pm2 > /dev/null; then
    echo "pm2 not found in PATH. Please install pm2 first"
    exit 1
fi

echo "Building your app for production"
npm run build

echo "Starting pm2"
pm2 startOrRestart ecosystem.config.js --env production