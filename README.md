
# Ecoblocks

[![Docker](https://img.shields.io/badge/docker-v20.10.7-blue)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-v13.3-blue)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-v4.4.6-green)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/react-v17.0.2-blue)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ecoblocks is an application using Docker, PostgreSQL, MongoDB, and microservices to manage blockchain transactions and user interactions.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Useful Docker Commands](#useful-docker-commands)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following software installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecoblocks.git
   cd ecoblocks
   ```

2. **Copy the `.env.example` file to `.env` and modify the environment variables as needed:**

   ```bash
   cp .env.example .env
   ```

   Here are examples of `.env` files for each service:

   **API `.env`**

   ```env
   DATABASE_URL=postgres://user:user_password@db:5432/db_name
   SECRET_KEY=
   ```

   **Blockchain `.env`**

   ```en
   MONGODB_URI=mongodb://mongodb:27017/db_name
   ```


3. **Run Diesel migrations in the Docker container:**

   ```
   docker exec -it ecoblocks-ecoblock-api-1 diesel migration run
   ```

### Useful Docker Commands

- **To start the containers:**

  ```bash
  docker-compose up
  ```

- **To stop the containers:**

  ```bash
  docker-compose down
  ```

- **To rebuild the containers (after modifying the Dockerfile or docker-compose.yml):**

  ```bash
  docker-compose up --build
  ```

- **To access the `ecoblock-api` container and run commands (e.g., Diesel migrations):**

  ```bash
  docker-compose run ecoblock-api /bin/bash
  ```

## Project Structure

The project is structured into several services:

- **API (`ecoblock-api`) :** Manages user interactions and blockchain transactions.
- **Blockchain (`ecoblock-blockchain`) :** Blockchain management service.
- **Database (`db`) :** PostgreSQL for storing user data.
- **MongoDB (`mongodb`) :** Storage for blockchain data.
- **Frontend (`ecoblock-webapp`) :** User interface for interacting with the application.

## Usage

After starting all services, you can access the web application at `http://localhost:3000` and interact with the various services through their respective API endpoints.

## Contribution

Contributions are welcome! Please submit pull requests and issues to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.