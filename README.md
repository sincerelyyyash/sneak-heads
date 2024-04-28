# SneakHeads

## Description
Full Stack Sneaker E-Commerce Web App built using MERN Stack with Stripe Payment Gateway Integration

### Technologies Used
- MongoDB
- Express
- React
- Node.js
- Stripe
- Cloudinary

## Steps to Run Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/sincerelyyyash/sneak_heads.git
    ```
2. Change directory to client:
    ```bash
    cd client
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Update base URL:
    - Navigate to `client/src/Constants/index.js`
    - Replace the base URL with your server's base URL or localhost URL with port.
5. Start the project:
    ```bash
    npm run dev
    ```

## Steps to Run Backend
**Prerequisites**: 
- Stripe account
- Cloudinary account
- MongoDB database

1. Change directory to server:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file:
    - Duplicate `.env.sample`
    - Replace the values with your own for:
        - Stripe Public key
        - Stripe Secret key
        - MongoDB URL
        - Cloudinary API key
        - Cloudinary Secret key
        - Cloudinary Cloud Name
        - Access & Refresh Token Secret
        - Cors Origin
4. Update CORS policy:
    - Navigate to `server/src/app.js`
    - Update CORS origin and policy as per your requirements.
5. Change directory to root (server folder):
    ```bash
    cd ..
    ```
6. Start the project:
    ```bash
    npm run dev
    ```

## Contributor
- [Yash Thakur](https://github.com/sincerelyyyash)

