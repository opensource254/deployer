#!/bin/sh
set -e
user=$(whoami)
echo "Hang in there ${user}. I'm getting things ready 💪🏾"

echo "Running the linter 👀"
npm run lint:js -- --fix && npm run lint:style -- --fix

echo "Your code looks clean 👏🏾💪🏾"

echo "Let me now run some tests 🧪"
npm run test

echo "Enter your commit message in the next window 🖊"
git add --all
git commit
git push

echo "Hurray!! your code has been pushed to remote"