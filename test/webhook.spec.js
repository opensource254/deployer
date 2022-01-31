const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../backend/app')
const expect = chai.expect

chai.use(chaiHttp)

const app = chai.request.agent(server).keepOpen()

describe('Webhook ping', function () {
  it('should be able to ping', async function () {
    const res = await app.get('/webhooks/ping')
    expect(res).to.have.status(200)
  })

  it('Should handle to Github Webhook', async function () {
    const webhook = {
      ref: 'refs/heads/master',
      before: '0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c',
      after: '1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c',
      repository: {
        id: faker.datatype.number(),
        name: "deployer",
        full_name: "opensource254/deployer",
        private: false,
        owner: {
          name: "opensource254",
          email: "info@opensource254.co.ke",
          login: "opensource254",
          id: faker.datatype.number(),
          type: "Organization",
        },
      }
    }

    const res = await app.post('/webhooks/github').send(webhook)
    expect(res).to.have.status(201)
  })

  it('Should handle to Bitbucket Webhook', async function () {
    const webhook = {
      "actor": {
        "username": "opensource254",
        "display_name": "opensource254",
        "uuid": "f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9",
        "links": {
          "self": {
            "href": "https://api.bitbucket.org/2.0/users/opensource254"
          },
          "html": {
            "href": "https://bitbucket.org/opensource254"
          },
          "avatar": {
            "href": "https://bitbucket.org/account/opensource254/avatar/"
          }
        }
      },
      "repository": {
        "scm": "git",
        "website": "",
        "name": "deployer",
        "links": {
          "self": {
            "href": "https://api.bitbucket.org/2.0/repositories/opensource254/deployer"
          },
          "html": {
            "href": "https://bitbucket.org/opensource254/deployer"
          },
          "avatar": {
            "href": "https://bitbucket.org/account/opensource254/avatar/"
          }
        },
        "full_name": "opensource254/deployer",
        "owner": {
          "username": "opensource254",
          "display_name": "opensource254",
          "uuid": "f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9",
          "links": {
            "self": {
              "href": "https://api.bitbucket.org/2.0/users/opensource254"
            },
            "html": {
              "href": "https://bitbucket.org/opensource254"
            },
            "avatar": {
              "href": "https://bitbucket.org/account/opensource254/avatar/"
            }
          }
        },
        "type": "repository",
        "is_private": false,
        "uuid": "f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9",
        "full_slug": "opensource254/deployer"
      },
      "push": {
        "changes": [],
        "links": {},
        "forced": false,
        "new": [],
        "old": []
      },
      "created": false,
      "deleted": false,
      "updated": false,
      "comment_position": null,
      "comment_id": null,
      "comment_node": null,
      "comment_path": null,
    }

    const res = await app.post('/webhooks/bitbucket').send(webhook)
    expect(res).to.have.status(201)
  })

  it('Should handle to Gitlab Webhook', async function () {
    const webhook = {
      "object_kind": "push",
      "before": "0000000000000000000000000000000000000000",
      "after": "1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c",
      "ref": "refs/heads/master",
      "checkout_sha": "1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c",
      "user_id": faker.datatype.number(),
      "user_name": "opensource254",
      "user_email": "user@domain.con",
      "user_avatar": "https://secure.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon",
      "project_id": faker.datatype.number(),
      "project": {
        "id": faker.datatype.number(),
        "name": "deployer",
        "description": "",
        "web_url": "http://localhost:3000/deployer",
        "avatar_url": null,
        "git_ssh_url": "git@localhost:deployer.git",
        "git_http_url": "http://localhost:3000/deployer.git",
        "namespace": "opensource254",
        "visibility_level": 0,
        "path_with_namespace": "opensource254/deployer",
        "default_branch": "master",
        "homepage": "http://localhost:3000/deployer",
        "url": "http://localhost:3000/deployer.git",
        "ssh_url": "git@localhost:deployer.git",
        "http_url": "http://localhost:3000/deployer.git"
      },
      "repository": {
        "name": "deployer",
        "url": "http://localhost:3000/deployer.git",
        "description": "",
        "homepage": "http://localhost:3000/deployer",
        "git_http_url": "http://localhost:3000/deployer.git",
        "git_ssh_url": "git@localhost:deployer.git",
        "visibility_level": 0
      },
      "commits": [
        {
          "id": "1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c",
          "message": "Add a new file",
          "timestamp": "2014-10-10T14:42:30+02:00",
          "url": "http://localhost:3000/deployer/commit/1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c",
          "author": {
            "name": "opensource254",
            "email": "user.domain.com",
            "username": "opensource254"
          },
          "added": [
            "new_file.txt"
          ],
          "modified": [],
          "removed": [],
          "modified_files": [
            "new_file.txt"
          ]
        }
      ],
    }

    const res = await app.post('/webhooks/gitlab').send(webhook)
    expect(res).to.have.status(201)
  })
})
