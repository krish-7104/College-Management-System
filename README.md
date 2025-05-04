# College Management System

A comprehensive MERN stack-based College Management System that helps manage academic activities, student information, faculty details, and administrative tasks.

## Features

### Admin Features

- Complete system administration
- Manage faculty accounts and permissions
- Manage student accounts and enrollment
- View and manage academic departments
- Handle course assignments
- Generate and manage notices
- View and manage timetables
- Access comprehensive analytics and reports
- Manage system settings and configurations

### Faculty Features

- View and manage assigned courses
- Upload and manage study materials
- Create and manage assignments
- Track student attendance
- Grade submissions
- View and manage class timetables
- Communicate with students
- Update profile and credentials

### Student Features

- View enrolled courses
- Access study materials
- Submit assignments
- View grades and attendance
- Check timetable
- Download course materials
- Update profile information
- View notices and announcements

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- File Storage: Local Storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

Sample .env file is added in both backend and frontend, copy that variables and create `.env` in both the folders and then follow below given instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd College-Management-System
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI =mongodb://127.0.0.1:27017/College-Management-System
PORT = 4000
FRONTEND_API_LINK = http://localhost:3000
JWT_SECRET = THISISSECRET

NODEMAILER_EMAIL =
NODEMAILER_PASS =
```

4. Create a `.env` file in the frontend directory:

```env
REACT_APP_APILINK = http://localhost:4000/api

REACT_APP_MEDIA_LINK = http://localhost:4000/media

```

5. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

## Initial Setup

1. Create an admin account using the seeder:

```bash
cd backend
npm run seed
```

This will create a default admin account with the following credentials:

- Employee ID: 123456
- Password: admin123
- Email: admin@gmail.com

## Project Structure

```
college-management-system/
├── backend/
│   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── media/
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
└── README.md
```

## For Any Doubt Feel Free To Contact Me 🚀

- [My Website](http://krishjotaniya.netlify.app/)
- [Linkedin](https://www.linkedin.com/in/krishjotaniya/)
- [krishjotaniya71@gmail.com](mailto:krishjotaniya71@gmail.com)
