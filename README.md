## Description

Marketplace server repository.

## Installation

```bash
$ npm install
```

## Setup
1. Create .env file using env.example

```bash
PORT=3003 # API port

NODE_ENV=dev-api # dev-api, dev-worker, prod-api, prod-worker

SECRET_KEY=somesercretkey # your secret key, anything is ok

# notification
MAIL_HOST=smtp.gmail.com
MAIL_USER= # gmail account
MAIL_PASS= # gmail application key
MAIL_RECEIVED_ADDRESS= # email address that you want to receive the notification
TELEGRAM_TOKEN= # telegram bot token
TELEGRAM_CHAT_ID= # teleram chat id

# TYPEORM
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost # MySQL host
TYPEORM_PORT=3306 # MySQL port
TYPEORM_USERNAME=youruser # MySQL username
TYPEORM_PASSWORD=yourpassword # MySQL password
TYPEORM_DATABASE=english-learning # schema name
TYPEORM_MIGRATIONS_DIR=src/database/migrations
TYPEORM_MIGRATIONS=dist/database/migrations/*.js
TYPEORM_ENTITIES_DIR=dist/**/*.entity.js

# BLOCK REQUEST
LIMIT_REQUEST=5
LIMIT_HOURS_BLOCK_REQUEST=4

# CONFIG URL
URL_FRONTEND=
URL_BACKEND=
URL_API=

```
2. Build db container
```bash
$ docker compose up

```
3. Create database structure.
- Open mysql, create database ```english-learning```
- Run migrations in terminal to create database 
  ```bash
  $ npm run migrations:run
  ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build mode
$ npm run build
```

## License

This project is under [MIT licensed](LICENSE).

## Gen SSL
You need to generate sslcert with your domain and replace sslcert folder.



