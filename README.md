# SneakHeads

## Description
Full Stack Sneaker E-Commerce Web Application built using MERN Stack with comprehensive user authentication, role-based access control, shopping cart functionality, order management, and Stripe payment gateway integration.

### Technologies Used

#### Frontend
- **React** - Component-based UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Recoil** - State management library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **Stripe React.js** - Payment processing components

#### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **Stripe** - Payment processing
- **Cloudinary** - Cloud-based image storage
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## Features

### User Authentication & Authorization
- User registration and login with JWT authentication
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Refresh token mechanism for session management
- Password change functionality

### Product Management
- Browse all products with search functionality
- Detailed product view with multiple images
- Admin-only product addition and modification
- Product categorization and stock management
- Cloudinary integration for image storage

### Shopping Cart & Orders
- Add/remove products from cart
- Modify product quantities
- Secure checkout process with Stripe integration
- Order history and status tracking
- Order cancellation functionality

### User Profile
- View and update user profile information
- Change email and password
- Order history management

## Project Structure

```
sneak_heads/
├── client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Page components
│   │   ├── Api/            # API service functions
│   │   ├── Recoil/         # State management atoms
│   │   ├── assets/         # Static assets (images, icons)
│   │   └── sections/       # Page sections
│   └── public/             # Public static files
└── server/                 # Express.js backend
    └── src/
        ├── controllers/    # Business logic
        ├── models/         # Database schemas
        ├── routes/         # API routes
        ├── middlewares/    # Custom middleware
        ├── utils/          # Utility functions
        └── db/            # Database connection
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Stripe account
- Cloudinary account

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sincerelyyyash/sneak_heads.git
   ```

2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Update configuration:
   - Navigate to `client/src/Constants/index.js`
   - Update the `baseUrl` with your server's URL
   - Replace `stripePublicKey` with your Stripe public key

5. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   Create a `.env` file in the server directory with the following variables:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Server Configuration
   PORT=8000
   CORS_ORIGIN=http://localhost:5173
   ```

4. Update CORS configuration:
   - Navigate to `server/src/app.js`
   - Update CORS origin to match your frontend URL

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### Products
- `GET /api/v1/product/allproducts` - Get all products
- `GET /api/v1/product/get-products` - Get product by ID
- `POST /api/v1/product/add-product` - Add new product (Admin only)
- `POST /api/v1/product/update-product` - Update product (Admin only)

### Cart Management
- `POST /api/v1/cart/add` - Add product to cart
- `POST /api/v1/cart/modify` - Modify product quantity
- `POST /api/v1/cart/remove` - Remove product from cart
- `GET /api/v1/cart/getall` - Get all cart items

### Orders
- `POST /api/v1/order/new-order` - Create new order
- `POST /api/v1/order/create-checkout-session` - Stripe checkout session
- `GET /api/v1/order/all-orders` - Get user orders
- `POST /api/v1/order/cancel-order` - Cancel order

## Security Features
- JWT-based authentication with access and refresh tokens
- Password hashing using bcrypt
- Role-based access control for admin operations
- CORS configuration for cross-origin requests
- Input validation using Zod schemas

## Deployment
- Frontend deployed on Netlify: [https://sneakheads.netlify.app](https://sneakheads.netlify.app)
- Backend deployed with custom domain integration

## Contributors
- [Yash Thakur](https://github.com/sincerelyyyash)

## License
ISC

