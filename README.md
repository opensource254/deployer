
# Deployer
![Node.js CI](https://github.com/opensource254/deployer/workflows/Node.js%20CI/badge.svg)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

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

