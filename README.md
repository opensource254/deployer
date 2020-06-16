![Node.js CI](https://github.com/opensource254/deployer/workflows/Node.js%20CI/badge.svg)
# Deployer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4f995596e00d43a89c2fc753bf8786a4)](https://app.codacy.com/gh/opensource254/deployer?utm_source=github.com&utm_medium=referral&utm_content=opensource254/deployer&utm_campaign=Badge_Grade_Dashboard)

> Deploy you apps in seconds using the Githubs webhook

## Setup
1. clone this repo and open a terminal in the repo
2. Install dependencies `npm i` or `yarn i`
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
It is basically and array of Objects.
#### Params
1. name: This is the name of your repo as it is on github. eg `opensource254/deployer` would be deployer.
2. Command: The bash command you want to run. This is basically a deploy command. Eg. For an Expressjs application using `pm2` this would be `cd <full path && git pull && npm i && npm restart [process-id]>`

If you want to change the port that this app runs, create a `.env` file and add `PORT=<prefered_port>`

At this point, Your endpoint is ready for webhooks. It would be a great idea to run this behind a reverse proxy and give it a domain or a subdomain like. `mydomain.com` Then on the Github webhook settings,
1. webhook url `https://mydomain.com`
2. Content Type `application/json`

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
- [ ] Webhook Security
- [ ] Add Bitbucket support
- [ ] Web interface

## Contributing
Please visit our [guidelines](https://opensource254.github.io/guidelines)

## Disclaimer 
This project has not been properly tested use it at your own risk
