# Deployer
> Deploy you apps in seconds using the Githubs webhook

## Setup
1. clone this repo and open a terminal in the repo
2. Install dependencies `npm i` or `yarn i`
3. Create the deployments config `cp deployment.config.json.example deployment.config.json`
4. Add your config and Start the server

If you want to change the port that this app runs, create a `.env` file and add `PORT=<prefered_port>`

At this point, Your endpoint is ready for webhooks. It would be a great idea to run this behind a reverse proxy and give it a domain or a subdomain like. `mydomain.com` Then on the Github webhook settings,
1. webhook url `https://mydomain.com`
2. Content Type `application/json`

## TODO
- [x] Basic functionality
- [ ] Refactor
- [ ] Webhook Security

## Disclaimer 
This project has not been properly tested use it at your own risk