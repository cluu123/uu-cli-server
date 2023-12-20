#!usr/bin/env sh
yarn -v;
if [ $? -eq 0 ];
then
    yarn update;
    exit 0;
else
    npm -v;
    if [ $? -eq 0 ];
    then
        npm run update;
        exit 0;
    else
        echo "Please install yarn or npm";
        exit 1 
    fi;
fi;