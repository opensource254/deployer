
# Deployer
> Deployer is a self-hosted, open-source, self-configuring tool for deploying your projects to the cloud. It is designed to be as easy to use as possible, and to make it easy to get started.

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
API endpoints can be used to for mobile authentication
### Authentication
|  Path            |     Method      |   Description                     |  Parameters             |
|:-----------------|:----------------|:----------------------------------|:------------------------|
|  `/auth/login`    |       POST      |Authenticate a user                | `email,password`       |
|  `/auth/logout`   |       POST      |End the session of the current user|  none                  |
|  `/auth/user`     |       GET       |Get the current authenticated user |  none                  |

### Application routes
> These are routes to your apps

|   Path             |    Method   |   Description                     |  Parameters                |
|:-------------------|:------------|:----------------------------------|:---------------------------|
| `/applications`    |    GET      | Get all the configs               | none                       |
| `/aplications/{id}`|    GET      | Get a config by database ID       | none                       |
| `/applications`    |    POST     | Create a config                   | `name,description,command` |
| `/applications/{id}` |  DELETE   | Delete a config from the database | none                       |
| `/applications/{id}` |  PUT/PATH | Update a config in the database   | `name,description,command` |

### Webhooks
| Path         | Method | Description                  |
|:-------------|:-------|:-----------------------------|
| `/github`    | POST   | Github's webhook listener    |
| `/bitbucket` | POST   | Bitbucket's webhook listener |
| `/gitlab`    | POST   | Gitlab's webhook listener    |

