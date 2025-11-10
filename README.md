# LLM Language Learning App

A full-stack language learning application built with Spring Boot (backend) and React/TypeScript (frontend).

## Authors

- Erine Tieu
- Redrix Natanauan
- Jane Doe
- Charlotte Z

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

### Required Software

1. **Java Development Kit (JDK) 25**

   - Download and install from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
   - Verify installation by running:
     ```bash
     java -version
     ```
2. **Maven 3.6+**

   - Download from [Maven Apache](https://maven.apache.org/download.cgi)
   - Mac users use [Homebrew](https://brew.sh/). Install homebrew then run:

   ```
   brew install maven
   ```

   - Windows users please install [Choclatey](https://chocolatey.org/install) or [Scoop](https://scoop.sh/)

   ```
   # Maven
   choco install maven

   #Scoop
   scoop bucket add main
   scoop install main/maven
   ```

   - Or use the Maven wrapper (`mvnw`) included in the project
   - Verify installation by running:
     ```bash
     mvn -version
     ```
3. **Node.js 18+ and npm**

   - Download from [Node.js official website](https://nodejs.org/)
   - Verify installation by running:
     ```bash
     node -version
     npm -version
     ```
4. **MySQL 8.0+**

   - Download from [MySQL official website](https://dev.mysql.com/downloads/mysql/)
   - Install and ensure MySQL server is running
   - Verify installation by running:
     ```bash
     mysql --version
     ```
5. **Github Desktop**

   - This will make it easier to do Pull Requests and via Github Desktop GUI
   - Download from here [Github Desktop Download](https://desktop.github.com/download/)

### Git Setup

If you're new to Git and want to contribute via pull requests, follow these steps:

1. **Install Git**

   - Download from [Git official website](https://git-scm.com/downloads)
   - Verify installation by running:
     ```bash
     git --version
     ```
2. **Configure Git (First time only)**

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
3. **Clone the Repository**

   ```bash
   git clone https://github.com/rinster/llm_language_app
   cd LLM_language_app
   ```
4. **Create a New Branch for Your Work**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bugfix-name
   ```
5. **Sync with Remote Repository (Before Starting Work)**

   ```bash
   # Fetch latest changes from the remote repository
   git fetch origin

   # Switch to main branch
   git checkout main

   # Pull latest changes
   git pull origin main

   # Switch back to your feature branch
   git checkout feature/your-feature-name
   ```
6. **Making Changes and Preparing for Pull Request**

   ```bash
   # After making your changes, check what files have been modified
   git status

   # Add files to staging area
   git add .
   # or add specific files
   git add path/to/file

   # Commit your changes with a descriptive message
   git commit -m "Description of your changes"

   # Push your branch to remote repository
   git push origin feature/your-feature-name

   # Then create a Pull Request on GitHub Desktop. 
   ```

## Getting Started

### 1. Database Setup

1. Start your MySQL server
2. Create the database:

   ```bash
   mysql -u root -p
   ```

   ```sql
   CREATE DATABASE llm_lang_data;
   EXIT;
   ```
3. Update database credentials in `backend/src/main/resources/application.properties` if needed:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/llm_lang_data
   spring.datasource.username=root  
   spring.datasource.password=root      # update to your local db password
   ```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Build the project:

   ```bash
   # mac
   mvn clean install

   # On Windows:
   mvnw.cmd clean install
   ```
3. Run the Spring Boot application:

   ```bash
   # mac
   mvnw spring-boot:run

   # On Windows:
    mvnw.cmd spring-boot:run
   ```
4. Debugging Build Failures

   ```
   [INFO] Scanning for projects...
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD FAILURE
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time:  0.170 s
   [INFO] Finished at: 2025-11-01T16:54:03-07:00
   [INFO] ------------------------------------------------------------------------
   ```

   - Often you might come across build failures even though your code looks fine.
   - This might happen because of spring-boot's failure to compile properly.

   ```bash
   # mac
   mvn clean comile

   # On Windows:
    mvnw.cmd clean compile
   ```

   The backend server will start on `http://localhost:8080` (default Spring Boot port).
   Note: Flyway will automatically run database migrations on startup.

### 3. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

## Development

- **Backend**: Spring Boot application with MySQL database, running on port 8080
- **Frontend**: React application with Vite, running on port 3000

## Additional Notes

- Database migrations are handled automatically by Flyway on backend startup
- Make sure MySQL is running before starting the backend
- Both frontend and backend need to be running simultaneously for full functionality
