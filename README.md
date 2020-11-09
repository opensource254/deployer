# Deployer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4f995596e00d43a89c2fc753bf8786a4)](https://app.codacy.com/gh/opensource254/deployer?utm_source=github.com&utm_medium=referral&utm_content=opensource254/deployer&utm_campaign=Badge_Grade)
![Node.js CI](https://github.com/opensource254/deployer/workflows/Node.js%20CI/badge.svg)

> Deploy you apps in seconds using the webhook feature

## Setup
1. Clone this repo and open a terminal in the repo 
2. Install dependencies `npm i` or `npm insall`. Or you can use yarn if you wish
3. Copy `.env.example` to `.env` and edit the necessary entries
4. Start your server.

*All the deployment config is stored in your database so you need to login in using your client*
If you don't have your own client you can use [this](https://github.com/opensource254/deployer-client).
### Using the client
_Docs coming soon_

<!-- // TODO update the new docs  -->

## Endpoints
API endpoints
### Authentication
|  Path            |     Method      |   Description                     |  Parameters            |
|:-----------------|:----------------|:----------------------------------|:-----------------------|
|  `/api`          |       GET       |The API root                       |  None                  |
|  `/api/regsiter` |       POST      |Create a new account               | `name,email, password` |
|  `/api/login`    |       POST      |Authenticate a user                | `email,password`       |
|  `/api/logout`   |       POST      |End the session of the current user|  none                  |
|  `/api/user`     |       GET       |Get the current authenticated user |  none                  |

### Config routes
|   Path             |    Method   |   Description                     |  Parameters                |
|:-------------------|:------------|:----------------------------------|:---------------------------|
| `/api/config`      |    GET      | Get all the configs               | none                       |
| `/api/config/{id}` |    GET      | Get a config by database ID       | none                       |
| `/api/config`      |    POST     | Create a config                   | `name,description,command` |
| `/api/config/{id}` |    DELETE   | Delete a config from the database | none                       |
| `/api/config/{id}` |    PUT/PATH | Update a config in the database   | `name,description,command` |

### Webhooks
| Path         | Method | Description                  |
|:-------------|:-------|:-----------------------------|
| `/github`    | POST   | Github's webhook listener    |
| `/bitbucket` | POST   | Bitbucket's webhook listener |
| `/gitlab`    | POST   | Gitlab's webhook listener    |