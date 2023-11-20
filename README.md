
# College Management System

The College Management System is a MERN Stack-based system with three different login portals for students, faculty, and admin.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


Youtube Link: https://www.youtube.com/watch?v=LY4UhPadZCs&ab_channel=KrishJotaniya

Setup Link: https://www.youtube.com/watch?v=aR0E_UrCzMI&t=6s

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
- 
## Installation Steps

To run this project, you will need to add the following environment variables to your .env file

Firstly go to https://console.firebase.google.com/ create one project and then on left side meny click on build and then storage. Now click on Get Started and click on Production Mode then Next and Done. Now click on rules and replace the code given below with actual code and click on publish

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
Now after this click on left side menu settings then project setting and scroll down, click on Create App and then Add you website name there and click on register app now you will get all api keys add that data in .env file in frontend side. 

Backend And Frontend Both Folder Has One sample.env file you can replicate it add you data and rename it to .env

Add this document in your College Management Collection in MongoDB Compass in **admin details** table

```
{
  "employeeId": 123123,
  "firstName": "YOUR_DATA",
  "middleName": "YOUR_DATA",
  "lastName": "YOUR_DATA",
  "email": "test@admin.com",
  "phoneNumber": YOUR_DATA,
  "gender": "Male",
  "profile": "https://cdn.britannica.com/42/193142-050-F69B1A23/Sundar-Pichai-Google.jpg",
} 
```

Then add the below document without any changes in **Admin Credentials**

```
{
  "loginid": 123123,
  "password": "112233",
}
```

Now login into admin with Above mentioned login and password. You need to add branches and faculty from admin and then after adding faculty to faculty login and add student.


