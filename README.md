# 🎟️ SANOHOLIC – Event Booking Platform (MERN Stack)

SANOHOLIC is a **full-stack event discovery and booking platform** built using the **MERN stack**.  
It supports **role-based authentication**, **secure bookings**, **organizer approval workflows**, and a powerful **admin dashboard**.

This project follows **real-world architecture**, making it suitable for **production deployment**, **internships**, and **portfolio showcase**.

---

## 🚀 Live Features

### 👤 User
- Register & Login
- Browse events
- View event details
- Book & cancel events
- View booking history
- Profile with avatar upload
- Change password

---

### 🧑‍💼 Organizer
- Apply for organizer role (admin approval required)
- Email notification on approval / rejection
- Create, edit & delete own events
- View bookings for own events
- Change password after first login

---

### 🛡️ Admin
- Approve / reject organizer requests (email notification)
- View all events with organizer details
- View bookings:
  - Grouped by events
  - Grouped by users
- Delete any event, booking, or user
- Analytics dashboard:
  - Total users
  - Total organizers
  - Total events
  - Total bookings
  - Top booked events

---

## 🧠 Core Concepts Used
- JWT Authentication
- Role-based Authorization (User / Organizer / Admin)
- Protected Routes (Frontend & Backend)
- RESTful API design
- MongoDB schema relationships
- Email integration (Nodemailer with App Password)
- File uploads (Avatar)
- Admin moderation workflow
- Secure password hashing (bcrypt)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Bcrypt
- Nodemailer
- Multer

### Database
- MongoDB Atlas

---

## 📂 Project Structure

Sanoholic/
├── Sanoholic-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│
├── Sanoholic-backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   └── server.js

---

## 🔐 Environment Variables

### Backend (.env)
PORT=5000  
MONGO_URI=your_mongodb_atlas_url  
JWT_SECRET=your_jwt_secret  
EMAIL_USER=your_email@gmail.com  
EMAIL_PASS=your_app_password  

### Frontend (.env)
VITE_API_URL=http://localhost:5000/api

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the Repository
git clone https://github.com/Santhosh-Kumar-S-527/Sanoholic_Event_Booking_System.git

---

### 2️⃣ Backend Setup
cd Sanoholic-backend  
npm install  
npm start  

Backend runs on:  
http://localhost:5000

---

### 3️⃣ Frontend Setup
cd Sanoholic-frontend  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173

---

## 🔒 Role-Based Access Summary

Role        | Book Events   | Create Events | Admin Panel
----        | -----------   | ------------- | -----------
User        | Yes           | No            | No
Organizer   | No            | Yes           | No
Admin       | No            | No            | Yes

---

## 📧 Email Workflow
- Organizer approval & rejection emails are sent automatically
- Uses Gmail App Password
- Secure & production-ready

---

## 📈 Future Enhancements
- Payment gateway integration
- QR code ticketing
- Email verification for users
- Event reviews & ratings
- Admin audit logs

---

## 👨‍💻 Author
Santhosh Kumar S  
MERN Stack Developer

---

## ⭐ Final Note
This is **not a basic CRUD project**.  
SANOHOLIC demonstrates **authentication, authorization, admin moderation, and real-world workflows**.

If you like this project, feel free to ⭐ the repository.
EOF
