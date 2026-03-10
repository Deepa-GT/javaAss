# Landmine Soft Gym Management Website

This repository contains the complete source code for the Full Stack Developer Internship Assignment (LMS-S3-202931). It is a full-stack Gym Management Website built with React.js, Java (Spring Boot), and MySQL.

## Project Overview

The application provides a comprehensive platform for managing a gym's operations. It features distinct roles for administrators and users, with a secure, API-driven architecture.

-   **Admins** can manage members, membership plans, trainers, and workout schedules through a dedicated admin panel.
-   **Users** can browse the gym's offerings, register for an account, view their membership status, and access workout schedules.

## Feature List

### Admin Panel

-   [x] **Secure Admin Login**: Role-based authentication to protect admin routes.
-   [x] **Manage Membership Plans**: Full CRUD (Create, Read, Update, Delete) functionality for gym membership plans.
-   [x] **Manage Gym Members**: View all registered users, assign membership plans, and update a member's status (Active/Expired).
-   [x] **Manage Trainers**: Full CRUD functionality for trainer profiles.
-   [x] **Manage Workout Schedules**: Full CRUD functionality for workout schedules (Beginner, Intermediate, Advanced).
-   [x] **View Member Subscriptions**: A basic reporting page to view all active and expired member subscriptions.

### User (Member) Side

-   [x] **Home Page**: A responsive landing page with gym details and smooth-scrolling sections.
-   [x] **View Plans & Schedules**: Browse all membership plans and workout schedules.
-   [x] **User Registration & Login**: A complete and secure user authentication system.
-   [x] **Persistent Sessions**: User login state is remembered even after a page refresh.
-   [x] **Profile Page**: A dedicated page for users to view their personal details and current membership status.

## Tech Stack

-   **Frontend**: React.js, Vite, CSS
-   **Backend**: Java, Spring Boot
-   **Database**: MySQL
-   **Authentication**: Session-Based Authentication with Spring Security

## Setup Instructions

To run this project locally, you will need to have Node.js, Java (JDK 17+), Maven, and MySQL installed.

### 1. Database Setup

1.  Ensure your MySQL server is running.
2.  Create a new database named `gymdb`.
3.  Configure the database credentials in the backend.

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd gym-backend

# Run the Spring Boot application using Maven
# Make sure to replace 'your_mysql_password' with your actual MySQL root password.
mvn spring-boot:run -Dspring-boot.run.profiles=mysql -Dspring-boot.run.jvmArguments="-Dspring.datasource.username=root -Dspring.datasource.password=your_mysql_password"
```

The backend will start on `http://localhost:8080`. The application will automatically create the necessary tables in the `gymdb` database on its first run.

### 3. Frontend Setup

```bash
# Navigate to the frontend directory in a new terminal
cd gym-frontend-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173` and will connect to the backend API.

## Default Admin Credentials

-   **Username**: `admin_db`
-   **Password**: `admin123`
# gym
