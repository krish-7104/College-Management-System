
# College Management System

The College Management System is a MERN Stack-based system with three different login portals for students, faculty, and admin.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

## Student Features

- Internal Marks: Access to view internal marks for courses
- External Marks: Access to view external marks for courses
- Course Materials: Ability to download course materials
- Notices: Access to view notices
- Timetables: Access to view their own timetables
- Password Update: Ability for students to update their passwords

## Faculty Features

- Student Details: Ability for faculty to view student details
- Password Update: Ability for faculty to update their own passwords
- Notices: Ability for faculty to add notices
- Materials Upload: Ability for faculty to upload course materials
- Timetable Management: Ability for faculty to manage timetables
- Exam Mark Recording: Ability for faculty to record internal and external exam marks

## Admin Features

- Account Creation: Ability for admins to add new students, faculty, and admin accounts
- Account Details Modification: Ability for admins to modify the details of each account
- Subject Management: Ability for admins to add/edit subjects
- Notices Management: Ability for admins to add/edit notices

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krish-7104/College-Management-System
   ```

2. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Setup environment variables:**

  - I have provided .env.sample in both frontend and backend using that create .env file

4. **Run the admin seeder:**

   ```bash
   cd backend
   npm run seed
   ```

   - **Login ID:** `123456`
   - **Password:** `admin123`
  
   - Using this login to the admin account and from admin you can add new faculty, student and admins!

5. **Run the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Run the frontend server:**

   ```bash
   cd ../frontend
   npm start
   ```

## For Any Doubt Feel Free To Contact Me 🚀

- [My Website](http://krishjotaniya.netlify.app/)
- [Linkedin](https://www.linkedin.com/in/krishjotaniya/)
- [krishjotaniya71@gmail.com](mailto:krishjotaniya71@gmail.com)
