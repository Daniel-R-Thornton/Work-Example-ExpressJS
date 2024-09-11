# Daniel Thornton's Example Project

## further information

### front end Readme:

[More details about the front end can be found here](https://github.com/Daniel-R-Thornton/Work-Example/tree/main/Client)

## Getting Started

### Requirements

You will need to have an installed copy of docker:
https://www.docker.com/products/docker-desktop/

And a configuired copy of Git:

https://git-scm.com/

### Step 1: Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/Daniel-R-Thornton/Work-Example.git
```

### Step 2: Navigate to the directory you cloned into

Navigate to the project using the command line:

```bash
cd <project-directory>
```

### Step 3: Initialise the docker environment

run the following in the command line ensuring you are still in the project directory.

```bash
docker compose build
```

### Step 4: Run the docker instances using docker compose

in the same command line window run :

```bash
 docker compose up
```

### Step 5: Validate the docker instances are running

In your command line you should now see at the bottom of the window

```bash
View in Docker Desktop o View Config w Enable Watch
```

Provided there are no errors in the command line proceed to the next step.

### Step 6 Navigate to the running web server

Head over to LocalHost:80 or just localhost and you should see the web application.

## Troubleshooting

### Navigating to local host returns an error

Ensure that you have no other services running on local host ports: 80, 8080 and 3306. If it is essential to have services on these ports edit the docker-compose.yml file in the root to re-map the shared ports.

### The API Fails to Connect to the Database

In order to ensure that the database is initialized correctly, the API is set up to attempt to run all migrations by default on the first connection to the database. Should this fail or if there is a corrupt database instance, you will need to run the .NET migrations manually. This can be done by following these steps:

1. **Ensure .NET SDK is Installed**: Make sure that the .NET SDK is installed on your machine. You can check this by running `dotnet --version` in your command line.

```bash
dotnet --version
```

2. **Navigate to the Project Directory**: Open your command line or command prompt and navigate to the directory containing your .NET project. This directory should contain your `.csproj` file.

   ```bash
   cd /path/to/your/project
   ```

3. **Run the Migrations Command**: Execute the following command to apply any pending migrations to your database:

   ```bash
   dotnet ef database update
   ```

   This command will apply all migrations to the database. Ensure that your connection string in the `appsettings.json` file is correctly configured to point to the right database.

4. **Check Migration Status**: If you need to check the status of your migrations or debug issues, you can use the following command to list the applied migrations:

   ```bash
   dotnet ef migrations list
   ```

5. **Create Migrations (if needed)**: If you need to create new migrations or if you have made changes to your data models, you can create a new migration using:

   ```bash
   dotnet ef migrations add MigrationName
   ```

   Replace `MigrationName` with a descriptive name for the migration.

6. **Consult Logs**: If you encounter any errors during the migration process, consult the logs for detailed error messages. These logs can usually be found in the `Logs` directory of your project or configured logging output.

By following these steps, you can manually apply migrations and address any issues related to database connectivity or initialization. If problems persist, consider reviewing your database configuration and connection settings.

## Assumptions taken:

### No Authorisation

    The api is not validating requests tokens and is not running with authentication or authorisation, for this to be used in a professional setting this would obviously be required, however this has been omitted for the sake of brevity.

### No Pagination

    To keep the implementation and review of the code quick and easy to do queries to not currently support paginination. This means that should you add more Clients or Funding Types the api will only return a fixed amount.

### Database Initialisation

    To keep the application easy to setup and get running migrations run automatically the first time you run the application, this creates the tables in the database as well as all of the default funding types.
