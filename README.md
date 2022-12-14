# Storefront Backend Project

## Getting Started

-to get start  npm install in your terminal at the project .
- you have to have  a env file in the ropo 
POSTGRES_HOST=127.0.0.1
POSTGRES_DB = amazing_world
POSTGRES_TEST_DB = amazing_world_test
POSTGRES_USER=m
POSTGRES_PASSWORD=postgresql
ENV=dev
bcrypt_password=dsafgfffffr
salt_rounds=10
TOKEN_SECRET=magic123!



## db creation and migration 
- to run migration up on dev environment run  npm run devup .
- to run migration down on dev environment run  npm run devdown .
- to run migration up on test environment run  npm run testup .
- to run migration down on test environment run npm run testdown.
- to creat anew migrarion run db-migrate create <tabl_name> --sql-file.
  

## load host port 
for the datavase , port is not specified so it will run on the selected port for postgres in 
    - default is 5432
    - server is runing on port 5000
   


## testing
- to be testing   npm run test


