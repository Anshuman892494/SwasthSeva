# SwasthSeva - Medical Appointment Management System

## Project Overview
SwasthSeva is a full-stack MERN application for managing medical appointments. It features Role-Based Access Control (RBAC) for Patients and Doctors.

## Screenshot
<img width="1920" height="1080" alt="image" src="https://github.com/Anshuman892494/SwasthSeva/blob/main/ScreenShots/Screenshot%202026-02-20%20112225.png?raw=true" />

## Features
- **Patient**: Register/Login, Book Appointments, View Appointment Status.
- **Doctor**: Login, View Assigned Appointments, Approve/Reject Appointments.
- **Security**: JWT Authentication, Password Hashing (Bcrypt), Protected Routes.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Setup & Run Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (if not exists) with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/meditrack
   JWT_SECRET=your_jwt_secret
   ```
4. Seed the database with sample doctors:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the `frontend` folder (in a new terminal):
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`.

## API Endpoints (Postman Examples)

### Auth
- **Register (Patient)**
  - `POST /api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "123", "role": "patient" }`
- **Login**
  - `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "123" }`
  - *Response*: Returns `token`. Use this token in Headers `Authorization: Bearer <token>` for protected routes.

### Appointments
- **Book Appointment (Patient Only)**
  - `POST /api/appointments`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "department": "Cardiology", "doctorName": "Dr. John Smith", "date": "2023-11-20", "timeSlot": "10:00 AM" }`
- **Get Appointments**
  - `GET /api/appointments`
  - Headers: `Authorization: Bearer <token>`
  - *Response*: List of appointments (filtered by patient or doctor based on token).
- **Update Status (Doctor Only)**
  - `PUT /api/appointments/:id`
  - Headers: `Authorization: Bearer <doctor_token>`
  - Body: `{ "status": "approved" }` (or "rejected")

## Sample Users
- **Doctor**: 
  - Email: `doctor@example.com`
  - Password: `password123`
- **Patient**: 
  - You can register a new patient via the frontend.
