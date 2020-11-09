# Deployer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4f995596e00d43a89c2fc753bf8786a4)](https://app.codacy.com/gh/opensource254/deployer?utm_source=github.com&utm_medium=referral&utm_content=opensource254/deployer&utm_campaign=Badge_Grade)
![Node.js CI](https://github.com/opensource254/deployer/workflows/Node.js%20CI/badge.svg)

> Deploy you apps in seconds using the webhook feature

## Setup
1. clone this repo and open a terminal in the repo
2. Install dependencies `npm i` or `yarn`
3. Create the deployments config `cp deployment.config.json.example deployment.config.json`
4. Add your config and Start the server

## Configuration
Your Deployment configurations live in the `deployment.config.json` file.
### Sample Config
```json
[
    {
        "name": "Awesome-App",
        "command": "cd path && git pull"
    }
]
```
It is basically an array.
If your repository is private, you may want to use [deploy keys](https://developer.github.com/v3/guides/managing-deploy-keys/) or cache your git credentials with the git credentials helper.
```bash
$ git config --global credential.helper 'cache --timeout=600'
```
The command above would cache your credentials for 600 seconds. You might want to set-up a cron job to be doing this atleast once a day.
```bash
$ sudo crontab -e
$ 29 0 * * *  git config --global credential.helper 'cache --timeout=31556952'
```
The cron job above runs everyday at 12:30 AM in your server's local time.
#### Params
1. name: This is the name of your repo as it is on github. eg `opensource254/deployer` would be deployer.
2. Command: The bash command you want to run. This is basically a deploy command. Eg. For an Expressjs application using `pm2` this would be `cd <full path> && git pull && npm i && npm restart [process-id]`. Or you could insert the path of the script to be excecuted. 
`bash path-to-script/script.sh` or `bash ./path-to-script/script.sh`.
*If you want to change the port that this app runs, create a `.env` file and add `PORT=<prefered_port>`*

At this point, Your endpoint is ready for webhooks. It would be a great idea to run this behind a reverse proxy and give it a domain or a subdomain like. `mydomain.com` Then on the Github webhook settings,
1. webhook url `https://mydomain.com/<provider>`
2. Content Type `application/json`
The provider can be any of these 
* github
* gitlab
* bitbucket

## Security
* Currently only the Github security is supported. 
* All the repos/webhooks SHOULD use on key provided in the .env
```env
SECRET=<your-secret>
```
Add this secret to your webhook secret too.
* If a security check fails, the endpoint will respond with error 403

## Notifications
Two notifications channels are currently supported.
* Email (The current supported protocal is SMTP)
* Slack
Turning notifications on
```env
ALLOW_NOTIFICATIONS=true
// Notify on successful deployment
SUCCESS_NOTIFICATIONS=false
// Notify on failures/warnings
ERROR_NOTIFICATIONS=false
```

### Email Configuration
Add the config details in the .env file.
example
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USERNAME=
SMTP_PASSWORD=

// The email to send notifications to
NOTIFICATION_EMAIL=
// The from address that will be shown in the email
NOTIFICATION_FROM=
```
### Slack Configuration
Slack config is as simple as adding the webhook config.
Create a Slack app and add the webhook url for the app to `.env` like below
```env
SLACK_WEBHOOK_URL=
```

## Debugging
Configuration erros are logged in the error.log file. This file is not version controlled.
```log
Sat, 13 Jun 2020 10:00:10 GMT Config: your-awesome-config, Error: /bin/sh: 1: c: not found
Sat, 13 Jun 2020 10:00:18 GMT Config: your-awesome-config, Error: /bin/sh: 1: c: not found
Sat, 13 Jun 2020 10:01:58 GMT Config: your-awesome-config, Error: /bin/sh: 1: ks: not found
```

## TODO
- [x] Basic functionality
- [x] Refactor
- [x] Webhook Security
- [x] Notifications
- [ ] Web interface

## Contributing
Please visit our [guidelines](https://opensource254.github.io/guidelines)

## Disclaimer 
This project has not been properly tested use it at your own risk.

