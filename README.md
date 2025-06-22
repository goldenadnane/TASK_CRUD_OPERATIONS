

https://github.com/user-attachments/assets/37de30b3-83bd-47e3-8eee-ce3e214ba0df

# Task Management System (TASK_CRUD_OPERATIONS)

A full-stack task management application with React frontend and Spring Boot backend.

## Features

- Create, Read, Update, Delete tasks
- Task filtering by status and priority
- Responsive UI with Material-UI components
- Form validation
- REST API backend

## Technologies

**Frontend:**
- React.js
- TypeScript
- Material-UI (MUI)
- React Hook Form
- Axios
- React Router

**Backend:**
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- MapStruct
- Lombok

## Setup Instructions

### Prerequisites

- Node.js
- Java 24
- PostgreSQL 
- Maven
  

### Backend Setup

1. **Database Configuration** :
   ```sql
   CREATE DATABASE task_management;

2. **Edit src/main/resources/application.properties** :

spring.datasource.url=jdbc:postgresql://localhost:5432/task_management
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.jpa.hibernate.ddl-auto=update


3. **Run Spring Boot Application** ( The backend will start on http://localhost:8080 )


### Frontend Setup

1. **Install Dependencies** :  use npm install
2. **Start React Development Server** : use npm start
