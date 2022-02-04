#!/bin/sh

## Set error handling
set -e
## Set debug mode
#set -x

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
TEAL='\033[0;36m'
STARTDATE=$(date +%s)

deployment_dir=$1
repository_url=$2
git_branch=$3

if [ -z "$deployment_dir" ] || [ -z "$repository_url" ]; then
    echo "${RED}Usage: ./$0 <deployment_dir> <repository_url> <git_branch>${NC}
    ${GREEN}Example: ./$0 /var/www/html/my-project git@yourdomain.com my-project-branch
    ${GREEN}Example 2: ./$0 /var/www/html/my-other-project https://yourdomain.com/my-other-project.git my-other-project-branch ${NC}
    ${TEAL}- Make sure you have permissions to write to the deployment directory.
    ${TEAL}- You will also need repository credentials to clone the repository."
    exit 1
fi

if [ -z "$repository_url" ]; then
    echo "${RED}Please provide the repository url as the second argument"
    exit 1
fi

if [ -z "$git_branch" ]; then
   git_branch="main"
fi


# get the folder name from the repository url
folder_name=$(basename $repository_url | cut -d. -f1)

echo "${TEAL}Deploying $folder_name to $deployment_dir"

HOME_DIR=$(eval echo ~$(whoami))
echo "${TEAL}Using  $HOME_DIR as home directory"
DEPLOY_DIR=$HOME_DIR/deploy
echo "Using  $DEPLOY_DIR as deploy directory"
## create the deploy directory if it does not exist
echo "Checking if $DEPLOY_DIR exists"
if [ ! -d $DEPLOY_DIR ]; then
    mkdir $DEPLOY_DIR
fi
echo "${TEAL}Switching to $DEPLOY_DIR"
cd $DEPLOY_DIR

echo "${TEAL}Checking if the current deployment is already in progress"
if [ -d $folder_name ]; then
    echo "${YELLOW}The current deployment is already in progress"
    echo "${YELLOW}Please wait for the current deployment to finish"
    exit 1
fi

## Delete deployent folder if it exists
if [ -d "$folder_name" ]; then
    echo "${YELLOW}Deleting old files"
    rm -rf $folder_name
fi

git clone  $repository_url --depth=1 -b $git_branch
cd $folder_name
echo "${TEAL}Commit message: ${YELLOW}$(git log -1 --pretty=%B)${NC} ${TEAL}Commit: $(git log -1 --pretty=%h)"
echo "${YELLOW}Removing .git folder"
rm -rf $DEPLOY_DIR/$folder_name/.git
echo "${TEAL}Copying files from $DEPLOY_DIR/$folder_name to $deployment_dir"
cp -rf $DEPLOY_DIR/$folder_name $deployment_dir
echo "${YELLOW}Deleting the $DEPLOY_DIR/$folder_name directory"
rm -rf $DEPLOY_DIR/$folder_name
echo "${TEAL}switching to $deployment_dir$folder_name"
cd $deployment_dir$folder_name
echo "${TEAL}Running post deployment script"
## check for the existtense of any of theses files update.sh, deploy.sh, postdeploy.sh
## if they exist then run the script
if [ -f "update.sh" ]; then
    echo "${TEAL}Running update.sh..."
    sh update.sh
    echo "Done."
    exit 0
fi

if [ -f "deploy.sh" ]; then
    echo "${TEAL}Running deploy.sh..."
    sh deploy.sh
    echo "Done."
    exit 0
fi

if [ -f "postdeploy.sh" ]; then
    echo "${TEAL}Running postdeploy.sh..."
    sh postdeploy.sh
    echo "Done."
    exit 0
fi

echo "${YELLOW}Please run your update script manually."
ENDDATE=$(date +%s)
echo "${YELLOW}Deployment took $(($ENDDATE - $STARTDATE)) seconds"
exit 0
