Documentation of task-manager web application
Installation Instructions for a Task Manager Web application that uses the MERN Stack and Next.js.

Step 1: Clone the Repository

1. Access the GitHub link provided in the `.txt` file.
2. Using Git or GitHub Desktop, clone the repository to your local machine. Run the following command in the terminal or command prompt:
  git clone https://github.com/VidhyaPatz/task-manager.git
3. unzip the files and extract the project folder.

Step 2: Install Required Software

Ensure the following software is installed on your system before proceeding:

•	Node.js (v14 or later) and npm: Node.js Download

•	Git for version control: Git Download

•	MongoDB (local or MongoDB Atlas for cloud DB): MongoDB Download

•	A code editor (e.g., VS Code): VS Code Download

Step 3: Set Up Environment Variables

1. In the root of the project directory, create a `.env.local` file.
2.  Add the following environment variables to the `.env.local` file:
   Code:
   MONGO_URI=mongodb://localhost:27017/
   NEXT_PUBLIC_API_URL=http://localhost:3000
…..

Step 4: Install Dependencies

1.	Navigate to the root of the project directory in the terminal using the code:
   cd task-manager
2. Use the following command thereafter to install all required dependencies for both the server and client:
   npm install

Step 5: Initialize the Database

1. If MongoDB is installed locally, make sure your MongoDB server is running. If using MongoDB Atlas, ensure the connection is correctly configured.
2. Once connected, verify that the database is operational by checking MongoDB Compass or similar tools to ensure the tasks collection is properly set up.

Step 6: Run the Application

1. Next.js can run both the front-end and back-end with a single command. Use the following to start the development server:
   npm run dev  
2. Once the server is running, you can access the application in your browser by navigating to:
   http://localhost:3000

Step 7: Testing

1. You can interact with the web application by creating, updating, deleting, and viewing tasks directly through the interface.
2. You can also test the API using tools like Postman. The API endpoints are available under `/api/tasks` for CRUD operations.


