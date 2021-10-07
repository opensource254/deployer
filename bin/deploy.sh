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

echo "$(date) - Starting deployment"
echo "$(date) - Current user: $(whoami)"
echo "$(date) - Current directory: $(pwd)"


# get the folder name from the repository url
folder_name=$(basename $repository_url | cut -d. -f1)

echo "Deploying $folder_name to $deployment_dir"

HOME_DIR=$(eval echo ~$(whoami))
echo "Using  $HOME_DIR as home directory"
DEPLOY_DIR=$HOME_DIR/deploy
echo "Using  $DEPLOY_DIR as deploy directory"
## create the deploy directory if it does not exist
echo "Checking if $DEPLOY_DIR exists"
if [ ! -d $DEPLOY_DIR ]; then
    mkdir $DEPLOY_DIR
fi
echo "Switching to $DEPLOY_DIR"
cd $DEPLOY_DIR

## Delete deployent folder if it exists
if [ -d "$folder_name" ]; then
    echo "Deleting old files"
    rm -rf $folder_name
fi

git clone  $repository_url --depth=1 -b $git_branch
echo "$(date) - Current branch: $(git rev-parse --abbrev-ref HEAD)"
echo "$(date) - Current commit: $(git rev-parse HEAD)"
echo "$(date) - Current commit message: $(git log -1 --pretty=%B)"
echo "$(date) - Current commit author: $(git log -1 --pretty=%an)"
echo "$(date) - Current commit date: $(git log -1 --pretty=%ad)"
echo "Removing .git folder"
rm -rf $DEPLOY_DIR/$folder_name/.git
echo "Copying files from $DEPLOY_DIR/$folder_name to $deployment_dir"
cp -rf $DEPLOY_DIR/$folder_name $deployment_dir
echo "Deleting the $DEPLOY_DIR/$folder_name directory"
rm -rf $DEPLOY_DIR/$folder_name
echo "switching to $deployment_dir$folder_name"
cd $deployment_dir$folder_name
echo "Running post deployment script"
## check for the existtense of any of theses files update.sh, deploy.sh, postdeploy.sh
## if they exist then run the script

echo "Please run your update script manually."