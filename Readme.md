This project is an experiment to measure and compare the read times from a MongoDB database with and without indexing, using Express.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Adding Users](#adding-users)
    - [Deleting Users](#deleting-users)
    - [Testing Read Times](#testing-read-times)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
    - [Add Users](#add-users)
    - [Delete Users](#delete-users)
    - [Get User by Indexed Email](#get-user-by-indexed-email)
    - [Get User by Non-Indexed Email](#get-user-by-non-indexed-email)
- [License](#license)

## Installation

Clone the repository:

```sh
git clone https://github.com/yourusername/2musers.git
cd 2musers
```

Install the dependencies:

```sh
npm install
```

# Run MongoDB using Docker

```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

# Start Server using pm2

```bash
npm run start
```

# Add users to MongoDB

This will add 2 Million users to the MongoDB database

```bash
npm run add-users
```

# Delete users from MongoDB

In case you want to delete all the users from the MongoDB database

```bash
npm run delete-users
```

## Usage

### Adding Users

To add a large number of users to the database, use the following script:

```sh
npm run add-users
```

This script will add 100,000 users by default. You can modify the number by changing the argument in the `package.json` file.

### Deleting Users

To delete all users from the database, use the following script:

```sh
npm run delete-users
```

### Testing Read Times

To test read times for non-indexed email fields:

```sh
npm run test:nonIndexed
```

To test read times for indexed email fields:

```sh
npm run test:indexed
```

## Scripts

- `npm run start`: Start the application using PM2.
- `npm run dev`: Start the application using nodemon for development.
- `npm run add-users`: Add a bulk number of users to the database.
- `npm run delete-users`: Delete all users from the database.
- `npm run test:nonIndexed`: Test read times for non-indexed email fields.
- `npm run test:indexed`: Test read times for indexed email fields.

## API Endpoints

### Add Users

- **Endpoint**: `/users1`
- **Method**: `POST`
- **Description**: Add multiple users to the database.
- **Request Body**:

    ```json
    {
        "count": 100000
    }
    ```

### Delete Users

- **Endpoint**: `/delete-users`
- **Method**: `DELETE`
- **Description**: Delete all users from the database.

### Get User by Indexed Email

- **Endpoint**: `/user/indexed`
- **Method**: `GET`
- **Description**: Retrieve a user by indexed email.
- **Query Parameter**:

    ```json
    {
        "email": "user2000000"
    }
    ```

### Get User by Non-Indexed Email

- **Endpoint**: `/user/non-indexed`
- **Method**: `GET`
- **Description**: Retrieve a user by non-indexed email.
- **Query Parameter**:

    ```json
    {
        "email": "user2000000"
    }
    ```
