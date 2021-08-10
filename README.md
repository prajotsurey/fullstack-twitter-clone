# fullstack-twitter-clone (WIP)

A minimal Fullstack Twitter clone made using Express and React.

* [Installation](#user-content-installation)
* [Usage](#user-content-usage)

## Installation

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
2. **React UI** in `client/` directory.

1. Clone project

```bash
git clone https://github.com/prajotsurey/fullstack-twitter-clone.git
```

2. Install dependencies for API server.

```bash
npm install
```
3. Install dependencies for React client.

In a separate terminal from the API server, start the UI:

```bash
cd client/

npm install
```

4. Start PostgreSQL server
5. Create database named 'twitter'
6. Add a user with the username `postgres` and password `password`
7. Run Migrations
```bash
npx sequelize-cli db:migrate
```
8. Install [Visual Studio Code REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
9. Create a file named `requests.rest` at the root and in it write:

```bash
POST http://localhost:3001/api/users/ HTTP/1.1
content-type: application/json

{
    "username": "newusername",
    "password": "newpassword"
}
```
10. Run the request by clicking on the prompt

## Usage

1. Start Server

```bash
npm run dev
```

2. Start client

In a separate terminal

```bash
cd client

npm start
```

## Features

1. Login
2. Create, bookmark and like tweets
3. Deploy backend and frontend

### WIP

* Register user
* Follow users
* Logout