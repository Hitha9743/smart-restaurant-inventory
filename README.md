🍽️ Smart Restaurant Inventory :
A full-stack restaurant inventory management system built with Spring Boot (backend) and Angular (frontend).
This project helps restaurants manage ingredients, dishes, and waste tracking with a clean UI and instant feedback (toast notifications).

🚀 Tech Stack :
Frontend: Angular, TypeScript, RxJS
Backend: Spring Boot, Hibernate, JPA
Database: MySQL
Build Tools: Maven (backend), Angular CLI (frontend)

📦 Project Structure :
restaurant-inventory/
 ├── backend/       # Spring Boot application
 │   ├── src/...
 │   └── pom.xml
 └── frontend/      # Angular application
     ├── src/...
     └── package.json

⚙️ Running Locally :
Backend (Spring Boot)

Go to the backend folder:
cd backend

Configure your MySQL database in src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/siwms
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Start backend:
mvn spring-boot:run
Runs at 👉 http://localhost:8080


Frontend (Angular) :
Go to the frontend folder:
cd frontend

Install dependencies:
npm install

Start dev server:
ng serve
Open 👉 http://localhost:4200

🛠️ Features :
✅ Manage Ingredients (CRUD)
✅ Manage Dishes and assign ingredients
✅ Track Waste (linked to ingredients)
✅ Toast notifications for success/error messages
✅ Responsive UI with clean layout
