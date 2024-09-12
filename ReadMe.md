# Daniel Thornton's Example Project

## Further Information

### Frontend README:

[More details about the frontend can be found here](https://github.com/Daniel-R-Thornton/Work-Example/tree/main/Client)

## Getting Started

### Requirements

You will need to have an installed copy of Docker:
[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

And a configured copy of Git:
[https://git-scm.com/](https://git-scm.com/)

### Step 1: Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone <repository-url>
```

### Step 2: Navigate to the Directory You Cloned Into

Navigate to the project directory:

```bash
cd <project-directory>
```

Replace `<project-directory>` with the name of the directory created by cloning the repository.

### Step 3: Initialize the Docker Environment

Run the following command to build the Docker containers:

```bash
docker compose build
```

### Step 4: Run the Docker Instances Using Docker Compose

Start the Docker containers:

```bash
docker compose up
```

### Step 5: Validate the Docker Instances Are Running

In your command line, you should see the following at the bottom of the window:

```bash
View in Docker Desktop | View Config | Enable Watch
```

Provided there are no errors in the command line, proceed to the next step.

### Step 6: Navigate to the Running Web Server

Open your browser and go to `http://localhost:80` or `http://localhost` to see the web application.

## Troubleshooting

### Navigating to Localhost Returns an Error

Ensure that no other services are running on localhost ports: 80, 8080, and 3306. If it's essential to have services on these ports, edit the `docker-compose.yml` file in the root to re-map the shared ports.

### The API Fails to Connect to the Database

To ensure that the database is initialized correctly, the API is set up to run all migrations by default on the first connection to the database. Should this fail or if there is a corrupt database instance, you will need to run the migrations manually. This can be done by following these steps:

1. **Ensure Sequelize CLI is Installed**: Make sure that the Sequelize CLI is installed on your machine for troubleshooting. You can check this by running `npx sequelize-cli --version` in your command line.

   ```bash
   npx sequelize-cli --version
   ```

2. **Navigate to the Project Directory**: Open your command line and navigate to the directory containing your Sequelize project. This directory should contain your `package.json` file.

   ```bash
   cd /path/to/your/project
   ```

3. **Run the Migrations Command**: Execute the following command to apply any pending migrations to your database (note the docker instance must be running):

   ```bash
   npx sequelize-cli db:migrate
   ```

   This command will apply all migrations to the database. Ensure that your `config/config.json` file is correctly configured with the right database settings.

4. **Check Migration Status**: If you need to check the status of your migrations or debug issues, you can use the following command to list the applied migrations:

   ```bash
   npx sequelize-cli db:migrate:status
   ```

5. **Create Migrations (if needed)**: If you need to create new migrations or if you have made changes to your data models, you can create a new migration using:

   ```bash
   npx sequelize-cli migration:generate --name MigrationName
   ```

   Replace `MigrationName` with a descriptive name for the migration.

6. **Consult Logs**: If you encounter any errors during the migration process, consult the logs for detailed error messages. These logs can usually be found in the `logs` directory of your project or configured logging output.

By following these steps, you can manually apply migrations and address any issues related to database connectivity or initialization. If problems persist, consider reviewing your database configuration and connection settings.

## Assumptions Taken

### No Authorization

The API is not validating request tokens and is not running with authentication or authorization. For a professional setting, authentication and authorization are required; however, these have been omitted for brevity.

### No Pagination

To keep the implementation and review of the code quick and easy, queries do not currently support pagination. This means that should you add more Clients or Funding Types, the API will only return a fixed amount.

### Database Initialization

To keep the application easy to set up and get running, migrations run automatically the first time you run the application. This creates the tables in the database as well as all of the default funding types.

### Crud Functionality

There is no implementation on the front end for the deletion , or updating of clients, this was done as the task specifically mentioned "reate a simple React and TypeScript front end to list and create clients using the above API" and i wanted to meets the tasks requirements as closely as possible.
