# Quiz Maker Application

## Introduction

Quiz Maker App

## Getting Started

These instructions will get the application up and running on your local machine.

### Prerequisites

- You should have Node.js installed on your computer.
- The application requires a JSON server to fetch and manage data.

### Running the Application

1. **Start the JSON Server**

   The application is designed to fetch data from a local JSON server. To start this server, navigate to the directory containing your `db.json` file, and use the following command:

   ```sh
   json-server --watch db.json --port 8000
   ```

   This command will start the JSON server on port 5000, making it accessible to the Quiz Maker application for data management tasks.

2. **Run the Application**

   After initiating the JSON server, start the Quiz Maker application. To do so, run the application-specific start command in your project directory. It will launch the application in your default web browser, connecting it to the JSON server backend.

Now, with both the application and server running, you can start creating, managing, and participating in quizzes right from your local machine.

Enjoy the experience!
