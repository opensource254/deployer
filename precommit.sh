#!/bin/env bash
## PRECOMMIT SCRIPT
user=$(whoami)
# TODO Finish this script

# remove the sqlite database
rm dev.sqlite3

# Make new migrations
npm run migrate:dev
# Run the Tests
npm cit

# Stage all the files
git add --all

# Commit the changes
git commit

# Publish the changes
git push

echo "All good to go $user 😁"