#!/bin/sh

## Set error handling
set -e
## Set debug mode
#set -x
#if [ "$1" == "-help" ]; then
#    echo "Usage: update.sh <deployment_dir> <repository_url> <branch_name>"
#    exit 0
#fi



deployment_dir=$1
if [ -z "$deployment_dir" ]; then
    echo "Please provide the deployment directory as the first argument"
    exit 1
fi

repository_url=$2
if [ -z "$repository_url" ]; then
    echo "Please provide the repository url as the second argument"
    exit 1
fi

git_branch=$3
if [ -z "$git_branch" ]; then
   git_branch="main"
fi

echo "$(date) - Starting deployment the current user is $(whoami)"
echo "$(date) - System load is $(uptime)"


# get the folder name from the repository url
folder_name=$(basename $repository_url | cut -d. -f1)

echo "$(date) - Deploying $folder_name to $deployment_dir"

HOME_DIR=$(eval echo ~$(whoami))
echo "$(date) - Using  $HOME_DIR as home directory"
DEPLOY_DIR=$HOME_DIR/deploy
echo "Using  $DEPLOY_DIR as deploy directory"
## create the deploy directory if it does not exist
echo "$(date) -Checking if $DEPLOY_DIR exists"
if [ ! -d $DEPLOY_DIR ]; then
    mkdir $DEPLOY_DIR
fi
echo "$(date) - Switching to $DEPLOY_DIR"
cd $DEPLOY_DIR

## Delete deployent folder if it exists
if [ -d "$folder_name" ]; then
    echo "$(date) - Deleting old files"
    rm -rf $folder_name
fi

git clone  $repository_url --depth=1 -b $git_branch
echo "$(date) - Removing .git folder"
rm -rf $DEPLOY_DIR/$folder_name/.git
echo "$(date) - Copying files from $DEPLOY_DIR/$folder_name to $deployment_dir"
cp -rf $DEPLOY_DIR/$folder_name $deployment_dir
echo "$(date) - Deleting the $DEPLOY_DIR/$folder_name directory"
rm -rf $DEPLOY_DIR/$folder_name
echo "$(date) - switching to $deployment_dir$folder_name"
cd $deployment_dir$folder_name

echo "$(date) - Deployment finished successfully"
exit 0