#!/bin/sh
set -e
echo -e "Default \e[32mGreen"
## The port that your application runs on
echo "Enter the port that deployer would run on e.g 3232"
read PORT

## This is the database client
echo "Enter your database client e.g mysql"
read DB_CLIENT

## This is the database host
echo "Enter your database host"
read DB_HOST

## This is the database username
echo "Enter your database username"
read DB_USER

## Dtabase password
echo "Enter your database password"
read DB_PASSWORD

## Write to the .env file
echo "PORT=${PORT}" >> .env
echo " " >> .env
echo "DB_CLIENT=${DB_CLIENT}" >> .env
echo "DB_HOST=${DB_HOST}" >> .env
echo "DB_USER=${DB_USER}" >> .env
echo "DB_PASSWORD=${DB_PASSWORD}" >> .env

## Setup SLACK
echo "Would you like to receive slack notifications y/n"
read SLACK_NOTIFICATIONS
## Slack notifications have been allowed
if [ $SLACK_NOTIFICATIONS == 'y' ]
then
   echo " " >> .env
   echo "SLACK_NOTIFICATION=true" >> .env
   echo "Enter the slack webhook URL below"
   read SLACK_WEBHOOK_URL
   echo "SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}" >> .env
fi
