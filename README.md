# ProjectNode 🚀

**ProjectNode** is a user and card management project developed with Node.js, Express, and MongoDB. This project serves as a user management system where users can register, log in, update their profiles, and create cards (for business users). In addition, there are special permissions for admins and business users.

---

## 📚 Introduction & Objectives

In this project we will practice:
- **REST API Development:** Building a robust and reliable REST API using Node.js and MongoDB.
- **User and Card Management:** A system that allows user registration, login, profile updates, and card management for business users.
- **Advanced Security:** Utilizing JWT for authentication, bcryptjs for password encryption, and data protection.
- **Modular Architecture:** Organizing the code into clear, modular files and directories that facilitate maintenance and future expansion.

> **Objective:** Master the art of building REST APIs while demonstrating advanced management and security capabilities in modern development.

---

## 🔧 Technologies & Tools

- **Node.js** – JavaScript runtime for building scalable applications.
- **Express.js** – Fast and flexible framework for building APIs.
- **MongoDB with Mongoose** – NoSQL database managed with Mongoose for defining schemas and models.
- **JWT** – For user authentication.
- **bcryptjs** – For password encryption.
- **dotenv** – For managing environment variables.
- **cors & morgan** – For handling requests, logging, and enabling cross-origin support.
- **Postman Collection:** A Postman export file is included in the project for testing API endpoints.

---

## 📁 Project Structure

- **Main Files:**
  - `app.js` – The main entry point of the application.
  - `package.json` – File for dependency management and scripts.

- **Folders and Modules:**
  - **routes/**  
    - `userRoutes.js` – Routes for user management.
    - `cardRoutes.js` – Routes for card management.
    - `authRoutes.js` – Routes for authentication (registration and login).
  - **controllers/**  
    - `authController.js` – Controller for handling registration and login.
    - `userController.js` – Controller for user management.
    - `cardController.js` – Controller for card management.
  - **models/**  
    - `userModel.js` – User model.
    - `cardModel.js` – Card model.
  - **middleware/**  
    - `authMiddleware.js` – Ensures the user is authenticated via JWT.
    - `adminMiddleware.js` – Ensures the user is an admin.
    - `businessMiddleware.js` – Ensures the user is a business user.
    
- **Postman Collection:**  
  The file `ProjectNode.postman_collection.json` (or a similarly named file) is included in the main directory for testing API endpoints.

> *Note:* The `node_modules` directory is not included in the repository.

---

## 🚀 Installation & Running

### Prerequisites
- **Node.js & npm:** Make sure you have the latest stable versions installed.
- **MongoDB:** A running instance of MongoDB (local or cloud).
- **Nodemon:** (Optional) For ease of development with auto-restarting on changes.

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Galdvash/ProjectNode/tree/main/BackEnd
   cd BackEnd
Install Dependencies:

bash
Copy
npm install
Set Up Environment Variables:
Create a .env file (or use existing environment variables) with the following content:

ini
Copy
JWT_SECRET=YourJWTSecretKey
MONGO_URI=mongodb://localhost:27017/NodeDataBase
PORT=5000
Run the Server:

bash
Copy
nodemon app
Access the API:
Once the server is running, you can access http://localhost:5000 using a browser, Postman, or another API testing tool.

📋 API Endpoints
Users
Registration (Register):
POST /users/register
Users can register with personal details. The isAdmin field is automatically set to false to prevent admin permissions.

Login:
POST /users/login
The user logs in and receives an authentication token.

User Management (Admin Only):

GET /users/ – Retrieve a list of all registered users.
PUT /users/:id – Update user details.
DELETE /users/:id – Delete a user.
Personal Profile Update:
PATCH /users/profile – Update the user's profile (excluding sensitive fields such as isAdmin or isBusiness).

Cards
Create New Card (For Business Users Only):
POST /cards/

Get All Cards:
GET /cards/

Card Management (Update and Delete):
PUT /cards/:id / PATCH /cards/:id / DELETE /cards/:id – Only the creator or an admin is allowed to update or delete a card.

🔒 Security Measures
JWT for Authentication:
All protected endpoints require a valid JWT token.
Password Encryption:
Secure password encryption is implemented using bcryptjs.
Authentication and Authorization Middleware:
authMiddleware – Ensures the user is authenticated.
adminMiddleware – Ensures the user is an admin.
businessMiddleware – Ensures the user is a business user.
📝 Manual Testing
You can test the API using Postman or a similar tool:

Registration and Login:

Send a POST request to /users/register with the required details.
Log in with a POST request to /users/login to receive a token.
Testing Protected Endpoints:

Add the header x-auth-token with the token you received.
Test endpoints such as /users/profile and /cards/.
Testing Permissions:

Attempt to access admin-protected endpoints with a regular user and verify that access is denied.
📫 Contact
For questions, comments, or testing inquiries, please contact:
Email: galdvash59@gmail.com

ProjectNode is developed by Gal Dvash. Thank you for your interest and good luck!
