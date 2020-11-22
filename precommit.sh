#!/bin/env bash
## PRECOMMIT SCRIPT
# Error Handling
set -e

user=$(whoami)
# remove the sqlite database
rm dev.sqlite

# Make new migrations
npm run migrate:dev

# Run seeds
npm run seed:dev

#Lint 
npm run lint -- --fix
# Run the Tests
npm cit

# Stage all the files
git add --all

# Commit the changes
git commit

# Publish the changes
git push

echo "All good to go $user 😁"