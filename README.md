## 👨‍💼Employee Management System

📌##Overview

The Employee Management System is a web-based application designed to efficiently manage employee records, including employee details, departments, and roles. The system provides a user-friendly interface built with React for the frontend and a robust backend powered by Spring Boot.

✨##Features

✅Employee Management: Create, Read, Update, and Delete (CRUD) employee records.

🏢Department Management: Assign employees to departments.

🔐Role-Based Access: Admin and Employee roles for restricted access.

🔑Authentication & Authorization: Secure login and role-based access control.

🔍Search & Filter: Search employees by name, department, and role.

🌐RESTful API: Backend API built with Spring Boot.

📱Responsive UI: Designed for desktop and mobile compatibility.

🛠##Technologies Used

🎨Frontend (React)

⚛️React.js

🚏React Router

🗂Redux (for state management)

📡Axios (for API calls)

🎨Bootstrap / Tailwind CSS (for styling)

⚙️##Backend (Spring Boot)

☕Spring Boot (Java)

🔒Spring Security (for authentication and authorization)

🗃Spring Data JPA (for database management)

🛢MySQL / PostgreSQL (Database)

🚀##Installation Guide

📋Prerequisites

Ensure you have the following installed:

🖥Node.js (for React)

☕ava 17+ (for Spring Boot)

🗄ySQL/PostgreSQL (Database)

Setup Backend (Spring Boot)

1. Clone the repository:
```bash
https://github.com/TonyVoo/Employee-Management-System.git
cd Employee-Management-System/backend
```

2. Configure database in application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=root
spring.datasource.password=yourpassword

3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```
Setup Frontend (React)

1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

📌##Usage

Run the backend and frontend as per the setup guide.

Open http://localhost:3000/ in your browser.

Login as an admin to manage employees.

Regular employees can view their details but have limited access.

🤝##Contributing

If you want to contribute:

Fork the repository

Create a new branch (feature-xyz)

Commit changes and push to your branch

Create a Pull Request

📜##License

This project is licensed under the MIT License.
