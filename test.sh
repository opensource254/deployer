#!/bin/env bash
set -e
# remove the sqlite database
rm dev.sqlite3

# Make new migrations
npm run migrate:dev

# Run the tests
npm test