# Backend README

## **Overview**

This Node.js backend application powers a **Sneaker E-Commerce React Application** deployed at [https://sneakheads.netlify.app](https://sneakheads.netlify.app). It provides a secure and scalable solution for managing users, authentication, product management, and role-based access control (RBAC). Designed with best practices for security and maintainability, the backend is modularized into **controllers**, **routes**, **middlewares**, **models**, and **utility functions** to ensure clarity and reusability.

### **Key Features**
- **Authentication and Authorization:** Custom-built using **JWT** for secure session handling and **bcrypt** for password hashing.
- **Role-Based Access Control (RBAC):** Ensures access to resources is restricted based on user roles, e.g., admin-specific operations.
- **Product Management:** Enables adding and modifying sneaker products with validation for admin roles.
- **Secure Token Refresh:** Implements robust mechanisms for access and refresh tokens.
- **CORS Management:** Configurable policies for cross-origin resource sharing.
- **React Frontend Integration:** Seamlessly integrates with the **Sneaker E-Commerce React Application** at [https://sneakheads.netlify.app](https://sneakheads.netlify.app).

---

## **Steps to Run Backend**

### **Prerequisites**
Before running the backend, ensure you have the following:
1. **Stripe Account:** For handling payments.
2. **Cloudinary Account:** For managing sneaker product images.
3. **MongoDB Database:** For storing user, product, and application data.

### **Setup Instructions**

1. **Change Directory to Server:**
   ```bash
   cd server
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   - Duplicate the provided `.env.sample` file.
   - Replace placeholder values with your own:
     - **Stripe Public Key:** Your Stripe API public key.
     - **Stripe Secret Key:** Your Stripe API secret key.
     - **MongoDB URL:** MongoDB connection string.
     - **Cloudinary API Key, Secret, and Cloud Name:** Credentials from your Cloudinary account.
     - **Access & Refresh Token Secrets:** Strong, unique keys for JWT token generation.
     - **CORS Origin:** Allowed origin(s) for cross-origin requests.

4. **Update CORS Policy:**
   - Navigate to `server/src/app.js`.
   - Modify the CORS configuration to include your frontend URL or other allowed origins.

5. **Change Directory to Root (Server Folder):**
   ```bash
   cd ..
   ```

6. **Start the Project:**
   ```bash
   npm run dev
   ```

---

## **Key Functionalities**

### **Role-Based Access Control (RBAC)**
- **Admin Privileges:** 
  - The `isAdmin` middleware ensures only admins can perform specific actions, such as adding or updating products.
  - Routes like `add-product` and `update-product` require both `verifyJWT` (to verify the session) and `isAdmin` middleware.
  
- **User Authentication:**
  - The `verifyJWT` middleware protects routes like user profile updates, order creation, and cart management, ensuring only authenticated users can access these functionalities.

### **Authentication & Authorization**
- **Custom Authentication:**
  - Utilizes **JWT** for session management.
  - Passwords are securely hashed using **bcrypt** before being stored in the database.
  - Refresh tokens are generated and stored, ensuring secure token renewal.
- **Authorization:** 
  - Validates users’ roles and permissions dynamically, enforcing security and resource access control.

### **Routes**
- **User Routes:** Secure routes for login, signup, logout, profile update, and password change.
- **Product Routes:** Add, update, and retrieve products with RBAC enforcement for admin-specific operations.
- **Order and Cart Routes:** Restricted to logged-in users with valid JWT tokens.

### **Secure Middleware**
- **`verifyJWT`:** Verifies if the incoming request contains a valid session token, ensuring access is restricted to authenticated users.
- **`isAdmin`:** Confirms the user has admin privileges before allowing access to critical operations.

---

## **Code Organization**

The project is well-structured for maintainability and scalability:
- **Controllers:** Business logic for routes.
- **Routes:** Separate route files for user, product, and other features.
- **Middlewares:** Custom middlewares like `verifyJWT`, `isAdmin`, and file upload handling.
- **Models:** MongoDB schemas for user, product, and other entities.
- **Utilities:** Helper functions for reusable tasks (e.g., token generation, error handling).
- **React Integration:** Designed to integrate seamlessly with the frontend **Sneaker E-Commerce React Application** deployed at [Link](---link---).

---

## **Conclusion**

This backend is the backbone of the **Sneaker E-Commerce React Application**, providing secure and efficient features for authentication, RBAC, and product management. Its modular design, robust security mechanisms, and seamless integration with the frontend ensure it is reliable, scalable, and production-ready.
