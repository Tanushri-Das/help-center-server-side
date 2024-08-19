# Overview of the project
This project is a Help Center application where users can submit new requests, view all sections, and retrieve details of a specific card by its title. The project is built using React.js, Tailwind CSS, Node.js, Express.js, Mongoose, and MongoDB.

# Clone the Repository

Server side github link : https://github.com/Tanushri-Das/help-center-server-side

# Install Dependencies

Server-Side Setup

Navigate to the server-side directory:

cd help-center-server-side

npm install or yarn install

# Configure Environment Variables
Create a .env file in the server-side directory with the following content:

DB_USER=mongodb-username

DB_PASS=mongodb-password

# Start the Server
In the server-side directory, start the Express.js server: nodemon index.js

This will run the server at http://localhost:5000


# Features
1. Add New Sections: Users can submit new requests by clicking the "Submit a Request" button in the header to add sections to the Help Center.

2. View All Sections: Users can view all the sections in the UI.

3. Get Details by Title: Users can retrieve the details of a single card by its title.

# Hoisting link

* Server Side Hoisting link : https://help-center-server-side.vercel.app/