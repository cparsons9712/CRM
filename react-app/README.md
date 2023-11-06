# Bantam CRM

Click here for the live site:  https://bantam-crm.onrender.com/

Bantam is a customer management system designed for freelancers or other single party small business operations. The backend was built using Python and Flask and the frontend was built using Javascript and React.


## Features

### Task
Task are to do items that a user wants to remember to get done by a specific date. They can be associated with a specific client account or they could be a general task (with no associated account) <br>
*Table Columns*:  `id`, `freelancerId`, `clientId`, `description`, `title`, `priority`, `completed`, `due_date`, `createdAt`
<br>
*CRUD*: Users are able to Create, Read, Update and Delete task. They also can mark a task complete/ in progress.

### Bookings
Bookings are scheduled appointments a user has with a client. There are booking specific restrictions when creating, such as the user nor the client can have something scheduled during the chosen time frame or a client can only schedule within a freelancers avaliability window. The end time is not inputed by the user, it will be automatically calulated based on start time and duration and will be used to determine if a user is avaliable during a time slot and to display the appointments in the calender <br>
*Table Columns*:  `id`, `freelancerId`, `clientId`, `day`, `time`, `duration`, `endTime`, `title`, `location`, `createdAt`
<br>
*CRUD*: Users are able to Create, Read, Update and Delete task. They also can mark a task complete/ in progress.


<!-- React Components list (if you used React)
Database Schema (if you used a database)
frontend routes document
API routes document (if you have a backend API)
Redux store tree document (if you used Redux) -->
