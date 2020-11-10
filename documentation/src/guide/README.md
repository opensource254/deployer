---
sidebar: auto
---

# Introduction

Deployer is a tool that makes continous delivery to your VPS easy. All you have to do is push your code, and deployer takes care of the rest.

The tool makes use of [webkooks](https://en.wikipedia.org/wiki/Webhook) provided by your code hosting provider. Deployer currently supports [Github](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhooks), [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/manage-webhooks/) and [Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html). 


# Getting started
## Backend setup.
1. Cloning 
      ```bash
      $ git clone https://github.com/opensource254/deployer.git
      $ cd deployer
      $ npm install --production
      $ cp .env.example .env
      ```
2. Add your configuration to the `.env` file. The most important of all is the database config
    ```config
    DATABASE_HOST=<your database host>
    DATABASE_USER=<your database username>
    DATABASE_PASSWORD=<your database password>
    DATABASE_NAME=<the name of the databse to be used>
    DATABASE_CLIENT=mysql,postgres,sqlite etc

    COOKIE_DOMAIN=<the domain that the deployer is being hosted>
    ```
    Please refer to [config](/config/) for a detailed configuration documentation
3. Run the migrations
        ```bash
        $ npm run migrate:prod
        ```
      This will create the tables necessary.
4. Run the application with `npm run start` or `yarn start`. The application runs on [localhost:3232](http://localhost:3232) by default.

## Client setup
Deployer comes with an official client which can be found [here](https://github.com/opensource254/deployer-client). You do not have to use it though. You can create your own.
1. Setting up
 ```bash
 $ git clone https://github.com/opensource254/deployer-client.git
 $ cd deployer-client && cp .env.example .env && yarn
 ```
2. Configure the client. Add the __API_URL__ value in your .env. The API_URL is the URL of the deployer server. *Please make sure you are hosting in in a domain*.
3. Build your application with `yarn build` and run it with yarn start. Please refer to [Nuxt](https://nuxtjs.org/docs/2.x/get-started/commands) for more options. Your application will run on [localhost:4010](http://localhost:4010) by default.