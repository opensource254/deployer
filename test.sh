#!/bin/env bash
set -e
# remove the sqlite database
echo -e "\e[33mRemoving dev.sqlite3"
rm dev.sqlite3

# Make new migrations
echo -e "\e[32mRunning Migrations"
npm run migrate:dev

# Run seeds
echo -e "\e[36mSeeding the database"
npm run seed:dev

# Run the tests
echo "Running tests"
npm test