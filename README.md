# 🚀 Smart Interview Tracker (SIT)

A full-stack MERN application designed to help job seekers organize their applications, track interview stages, and store crucial recruiter notes in one centralized dashboard.

**✨ [Live Demo Link](https://si-tracker.vercel.app/)**

---

## 🛠️ Features
- **User Authentication:** Secure Sign-up and Login using JWT (JSON Web Tokens).
- **Interactive Dashboard:** Real-time stats showing Total Apps, Interviews, and Offers.
- **Smart Search:** Instant filtering by Company name or Position.
- **Note Management:** dedicated space for Zoom links, recruiter names, and follow-up tasks.
- **Responsive UI:** Fully optimized for mobile and desktop with Tailwind CSS.

---

## 🏗️ The Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Lucide-React.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose).
- **Deployment:** Vercel (Frontend) & Render (Backend).

---

## Local Setup
1. Install dependencies for the server and frontend:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```
2. Copy the example environment files and fill in values:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
3. Start the backend locally:
   ```bash
   cd server
   npm run start
   ```
4. Start the frontend locally:
   ```bash
   cd ../client
   npm run dev
   ```

### Environment variables
- `server/.env` should include:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CORS_ORIGIN`
- `client/.env` should include:
  - `VITE_API_URL`

> Do not commit `.env` files to source control. Keep both `server/.env` and `client/.env` local only.