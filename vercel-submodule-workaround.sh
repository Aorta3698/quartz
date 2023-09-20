# github submodule repo address without https:// prefix
SUBMODULE_GITHUB=codeberg.org/Phrase9345/my-notes.git

# .gitmodules submodule path
SUBMODULE_PATH=content

# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e

# get submodule commit
output=`git submodule status --recursive` # get submodule info
no_prefix=${output#*-} # get rid of the prefix
COMMIT=${no_prefix% *} # get rid of the suffix

# set up an empty temporary work directory
rm -rf tmp || true # remove the tmp folder if exists
mkdir tmp # create the tmp folder
cd tmp # go into the tmp folder

# checkout the current submodule commit
git init # initialise empty repo
git remote add origin https://$ACCESS_TOKEN@$SUBMODULE_GITHUB # add origin of the submodule
git fetch --depth=1 origin $COMMIT # fetch only the required version
git checkout $COMMIT # checkout on the right commit

# move the submodule from tmp to the submodule path
cd .. # go folder up

rm -rf tmp/.git # remove .git 
rm -rf $SUBMODULE_PATH || true
mkdir $SUBMODULE_PATH

mv tmp/* $SUBMODULE_PATH/ # move the submodule to the submodule path

# clean up
rm -rf tmp # remove the tmp folder