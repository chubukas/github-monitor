# github-monitor

## Description

[Note] A GitHub's public APIs that retrieve repository information and commits, save the data in a persistent store (am using Postgres), and continuously monitor the repository for changes (am using Cronjob).

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn dev 

# production mode
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test
```

## Endpoints

### BaseURl
`http://localhost:9100/api/v1`

<details>
 <summary><code>GET</code> <code><b>/repo/fresh/{owner}/{repo}</b></code> <code>(Fetches repo and its commits from Git hub database)</code></summary>

#### Request

> | name    |  status   |      type                | description                              |
> |---------|-----------|--------------------------|------------------------------------------|
> | `owner` |  required | parameter (String)       | Owner of the repo                        |
> | `repo`  |  required | parameter  (String)      | Name of the repo                         |
> | `page`  |  Optional | query string  (String)   | Page to start paginating in the commits             |
> | `date`  |  Optional | query string  (String)   | the date to start fetching the commits   |

##### Responses

> | http code     | content-type                      | response                                 |
> |---------------|-----------------------------------|------------------------------------------|
> | `201`         | `text/plain;charset=UTF-8`        | `successfully`                           |
> | `500`         | `application/json`                | `{"code":"500","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:9100/api/v1/repo/fresh/chubukas/pageme
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/repo/stored/{name}</b></code> <code>(Fetch stored repo from database)</code></summary>

#### Request

> | name    |  status   |      type                | description                              |
> |---------|-----------|--------------------------|------------------------------------------|
> | `name`  |  required | parameter  (String)      | Name of the repo                         |
> | `page`  |  Optional | query string  (String)   | Page to start paginating in the commits             |
> | `date`  |  Optional | query string  (String)   | the date to start fetching the commits   |

##### Responses

> | http code     | content-type                      | response                                 |
> |---------------|-----------------------------------|------------------------------------------|
> | `302`         | `text/plain;charset=UTF-8`        | `successfully`                           |
> | `500`         | `application/json`                | `{"code":"500","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:9100/api/v1/repo/stored/pageme
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/commit/repo/{repoName}</b></code> <code>(Fetch commits from a particular repo from database)</code></summary>

#### Request

> | name    |  status   |      type                | description                              |
> |---------|-----------|--------------------------|------------------------------------------|
> | `repoName`  |  required | parameter  (String)      | Name of the repo                         |
> | `page`  |  Optional | query string  (String)   | Page to start paginating in the commits             |
> | `date`  |  Optional | query string  (String)   | the date to start fetching the commits   |

##### Responses

> | http code     | content-type                      | response                                 |
> |---------------|-----------------------------------|------------------------------------------|
> | `302`         | `text/plain;charset=UTF-8`        | `successfully`                           |
> | `500`         | `application/json`                | `{"code":"500","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:9100/api/v1/commit/repo/pageme
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/commit/top-authors</b></code> <code>(Fetch top authors from all commits in database)</code></summary>

#### Request

> | name    |  status   |      type                | description                              |
> |---------|-----------|--------------------------|------------------------------------------|
> | `page`  |  Optional | query string  (String)   | Page to start paginating in the commits             |
> | `date`  |  Optional | query string  (String)   | the date to start fetching the commits   |

##### Responses

> | http code     | content-type                      | response                                 |
> |---------------|-----------------------------------|------------------------------------------|
> | `302`         | `text/plain;charset=UTF-8`        | `successfully`                           |
> | `500`         | `application/json`                | `{"code":"500","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:9100/api/v1/commit/top-authors
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/commit/repo-top-authors/{repoName}</b></code> <code>(Fetch top authors from commits from a particular repo in the database)</code></summary>

#### Request

> | name    |  status   |      type                | description                              |
> |---------|-----------|--------------------------|------------------------------------------|
> | `repoName`  |  required | parameter  (String)      | Name of the repo                         |
> | `page`  |  Optional | query string  (String)   | Page to start paginating in the commits             |
> | `date`  |  Optional | query string  (String)   | the date to start fetching the commits   |

##### Responses

> | http code     | content-type                      | response                                 |
> |---------------|-----------------------------------|------------------------------------------|
> | `302`         | `text/plain;charset=UTF-8`        | `successfully`                           |
> | `500`         | `application/json`                | `{"code":"500","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:9100/api/v1/commit/repo-top-authors/pageme
> ```

</details>

## Stay in touch

+ Author - [Chukwuebuka Anyadiegwu](https://pageme.netlify.app/)

## License

Nest is [MIT licensed](LICENSE).
