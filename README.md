# 📦 Course Subscription Backend API

A Node.js + Express + TypeScript backend for a Course Subscription Platform.  
This API handles authentication, course management, subscriptions, and user enrollments with JWT-based security.

---

 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- dotenv
- CORS

---

 📁 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   ├── env.ts
│   │   └── jwt.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── course.controller.ts
│   │   └── subscription.controller.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── course.routes.ts
│   │   ├── subscription.routes.ts
│   │   └── index.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── course.model.ts
│   │   └── subscription.model.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── utils/
│   │   ├── hash.ts
│   │   └── token.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── tsconfig.json
├── package.json
└── README.md

🔐 Environment Variables

Create a .env file in the root of backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

📦 Installation
git clone <backend-repo-url>
cd backend
npm install

▶️ Run Locally (Development)
npm run dev


Server will start at:

http://localhost:5000

🏗 Build for Production
npm run build


This runs:

tsc


Output will be generated in:

/dist

▶️ Run Production Server
npm start

🔑 Authentication Flow

Login returns JWT token

Token must be sent in headers:

Authorization: Bearer <token>


Protected routes will fail without a valid token.

📚 API Endpoints
🔐 Auth
Method	Route	Description
POST	/api/auth/login	User login
📘 Courses
Method	Route	Description
GET	/api/courses	Get all courses
GET	/api/courses/:id	Get course by ID
GET	/api/courses/user/my-courses	Get user subscribed courses
💳 Subscription
Method	Route	Description
POST	/api/subscribe	Subscribe to a course

Promo Code Supported:

BFSALE25 (50% OFF)

🧠 Key Features

JWT-based authentication

Secure protected routes

MongoDB relationships using populate

Promo-code-based paid subscriptions

Image-safe course handling

Clean error handling

🚀 Deployment (Render Recommended)
Build Command
npm install && npm run build

Start Command
npm start


Add environment variables in Render Dashboard.

👨‍💻 Author

Shreyash Srivastav
Backend for Black Friday Course Subscription Demo App

📄 License

This project is for educational and demo purposes.


---

If you want next:
- 📘 Frontend README
- 🚀 Render + Vercel deployment guide
- ✅ Final submission checklist
- 🔒 Production security hardening

Just tell me 👍