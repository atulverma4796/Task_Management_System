# Task Management System

This is a Task Management System where users can create, update, and delete tasks. The system features dynamic form field permissions based on user roles (Admin, Manager, Employee). It is built using **Node.js**, **Express.js**, **PostgreSQL**, **React.js**.
## Table of Contents



## Features

- User authentication with roles (Admin, Manager, Employee)
- Role-based form field permissions
- Create, update, delete tasks
- Role-based API and route protection
- Frontend built with React

## Technologies Used

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React.js
- **Authentication**: JWT (JSON Web Tokens)


## Installation

To run this project locally, follow the steps below.

### Prerequisites

- **Node.js**:
- **PostgreSQL**:
STEPS TO CONNECT WITH POSTGRESQL
psql -U postgres
CREATE ROLE task_user WITH LOGIN PASSWORD '12345';
CREATE DATABASE task_management;
GRANT ALL PRIVILEGES ON DATABASE task_management TO task_user;
\q


### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-management-system.git
   insall All Dependencies using npm i
   connect to the DB using above command
   npm run dev

