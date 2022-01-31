#!/bin/sh
## Add error handling
set -e
set -u
## Add logging

RED='\033[0;31m'
GREEN='\033[0;32m'
AMBER='\033[0;33m'
NC='\033[0m' # No Color

## get the current user
USER=`whoami`
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
HOSTNAME=`hostname`

echo "${GREEN}Current directory: ${CURRENT_DIR}${NC}"

if ! which node > /dev/null; then
    echo "${RED}Node.js is not installed. Please install Node.js before running this script.${NC}"
    exit 1
fi

if ! which npm > /dev/null; then
    echo "${RED}Node Package Manager (npm) is not installed. Please install Node Package Manager (npm) before running this script.${NC}"
    exit 1
fi

if [ ! -f .env ]; then
    echo "${GREEN}Creating .env file at ${CURRENT_DIR}${NC}"
    touch .env
fi

if [ ! -d logs ]; then
    echo "${GREEN}Creating logs directory at ${CURRENT_DIR}/logs${NC}"
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
    DB_HOST=127.0.0.1
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
echo "DB_SCHEMA=$DB_NAME\n" >> .env

## Ask if user wants to enable Slack integration
read -p "Do you want to enable Slack integration? (y/n): " SLACK_ENABLED
if [ "$SLACK_ENABLED" = "y" ]; then
    echo "SLACK_ENABLED=true" >> .env
    read -p "What is your Slack webhook URL? (default https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX): " SLACK_WEBHOOK
    if [ -z "$SLACK_WEBHOOK" ]; then
        SLACK_WEBHOOK="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
    fi
    echo "SLACK_WEBHOOK=$SLACK_WEBHOOK\n" >> .env
fi
## Test the Slack integration
if [ "$SLACK_ENABLED" = "y" ]; then
    echo "${GREEN}Testing Slack integration...${NC}"
    curl -X POST -H 'Content-type: application/json' --data '{"text":"Testing Deployer Slack integration"}' $SLACK_WEBHOOK
    echo "\n${GREEN}Slack integration test passed.${NC}"
fi

## Ask if user wants to enable email integration
read -p "Do you want to enable email integration? (y/n): " EMAIL_ENABLED
if [ "$EMAIL_ENABLED" = "y" ]; then
    echo "EMAIL_ENABLED=true" >> .env
    read -p "What is your email address? (default $USER@$HOSTNAME) " EMAIL_ADDRESS
    if [ -z "$EMAIL_ADDRESS" ]; then
        EMAIL_ADDRESS="$USER@$HOSTNAME"
    fi
    echo "EMAIL_ADDRESS=$EMAIL_ADDRESS\n" >> .env
fi

## Ask for email configuration
echo "${GREEN}Please respond to the following questions to configure email.${NC}"
read -p "What is your email host? (default: localhost): " EMAIL_HOST
if [ -z "$EMAIL_HOST" ]; then
    EMAIL_HOST=localhost
fi
echo "EMAIL_HOST=$EMAIL_HOST" >> .env

read -p "What is your email port? (default 1025): " EMAIL_PORT
if [ -z "$EMAIL_PORT" ]; then
    EMAIL_PORT=1025
fi
echo "EMAIL_PORT=$EMAIL_PORT" >> .env

read -p "What is your email username? (default null): " EMAIL_USER
if [ -z "$EMAIL_USER" ]; then
    EMAIL_USER=null
fi
echo "EMAIL_USER=$EMAIL_USER" >> .env

read -p "What is your email password? (default null): " EMAIL_PASSWORD
if [ -z "$EMAIL_PASSWORD" ]; then
    EMAIL_PASSWORD=null
fi
echo "EMAIL_PASSWORD=$EMAIL_PASSWORD" >> .env
echo "${GREEN}Email configuration complete.${NC}"
## End email configuration

echo "${GREEN}Installing dependencies using npm${NC}"
npm install --no-audit --no-fund --no-warnings --production

echo "${GREEN}Installing $DB_CLIENT database client using npm${NC}"
npm install --no-audit --no-fund --no-warnings $DB_CLIENT

echo "${GREEN}Testing database connection${NC}"
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME"
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST -e "TRUNCATE TABLE $DB_NAME.users"

echo "${GREEN}Creating database tables${NC}"
npx knex migrate:latest --env=production

## Run the bin/dep node script
echo "${GREEN}Creating a new user${NC}"
node bin/dep

if ! which pm2 > /dev/null; then
    echo "${RED}PM2 is not installed. Please install PM2 before running this script.${NC}"
    exit 1
fi

echo "${GREEN}Building the application${NC}"
npm run build

echo "${GREEN}Starting the application${NC}"
pm2 startOrRestart ecosystem.config.js --env production

echo "${GREEN}Deployer is ready to use!${NC}"
echo "${GREEN}You can access the application at http://$HOST:$PORT${NC}"
exit 0
