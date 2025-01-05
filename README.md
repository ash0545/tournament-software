# Tournament Software

A personal fork of a project worked on by:

- Ashwin Santhosh, [ash0545](https://www.github.com/ash0545)
- Dharshen K
- Kaustub Pavagada, [Kaustub26Pvgda](https://www.github.com/Kaustub26Pvgda)
- Lokesh Shelva, [LokeshShelva](https://github.com/LokeshShelva)
- Mayank Sharma
- Shivakumar B, [ClassicBSK](https://github.com/ClassicBSK)

## Table of Contents

- [Tournament Software](#tournament-software)
  - [Table of Contents](#table-of-contents)
  - [Frontend Documentation](#frontend-documentation)
    - [Pre requisites](#pre-requisites)
    - [Running](#running)
  - [Backend Documentation](#backend-documentation)
    - [Environment Variables](#environment-variables)
    - [Running the Application](#running-the-application)
      - [Using Docker](#using-docker)
      - [Running Locally](#running-locally)

## Frontend Documentation

### Pre requisites

- Install `nodejs` 20. [Download](https://nodejs.org/en/download/)
- Clone this repo

### Running

- Check the version of node

```bash
node -v
# v20.10.0
```

- Run the dev server

```bash
cd tournament_app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Documentation

This documentation provides instructions for running the application locally or through Docker.

### Environment Variables

The application expects a `.env` file at the backend's root directory with the following environment variables:

- `ENV`: Specifies environment (Development / Production)
- `SECRET_KEY`: For token generation / verification
- `ALGORITHM`: For token generation / verification
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Expiration time for access tokens (minutes)
- `REFRESH_TOKEN_EXPIRE_MINUTES`: Expiration time for refresh tokens (minutes)
- `MONGO_CONNECTION_STRING`: Connection string for the MongoDB database

### Running the Application

#### Using Docker

To run the application using Docker, ensure that Docker is installed and running on your machine.

1. Open a terminal and navigate to the backend's root directory.
2. Run the following command to start the application with live updates through Docker Watch:

    ```bash
    docker compose watch
    ```

    The application will start and can be accessed on the designated URL (localhost:8000)
3. The application can be stopped and the Docker container removed through the following command:

   ```bash
    docker compose down
   ```

#### Running Locally

To run the application locally, ensure that Python 3.10+ is installed on your machine.

1. Open a terminal and navigate to the backend's root directory.
2. (Optional) Create a virtual environment and activate it through the following commands:

    ```bash
    python -m venv env
    source env/bin/activate
    # Windows: env\Scripts\activate
    ```

3. Install the required packages through pip.

    ```bash
    pip install -r requirements.txt
    ```

4. Run the application.

    ```bash
    python app/main.py
    ```

    The application will start and can be accessed on the designated URL (localhost:8000)
