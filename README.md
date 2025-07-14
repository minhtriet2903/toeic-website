# 📝 TOEIC Online Testing System

An online TOEIC test and learning platform built with **NestJS**, **MongoDB**, and **ReactJS**. The system supports user management, test creation, enrollment, document sharing, and a full-featured admin panel.

---

## 📚 Features

### 👨‍🎓 For Students:

* Register and login (Google/JWT supported)
* Join courses and take TOEIC tests
* View test results with correct/incorrect answers
* Access course materials and lessons

### 🧑‍🏫 For Teachers/Admins:

* Create and manage Courses, Lessons, Exams, and Questions
* Add students to courses
* Upload and manage learning documents (PDFs, slides, etc.)
* View student progress and test submissions

---

## 🛠️ Tech Stack

### Backend (NestJS + MongoDB)

* **NestJS**: Modular backend framework
* **Mongoose**: ODM for MongoDB
* **JWT Authentication** with access token in cookies
* **Role-based guards** (user/admin)
* **Multer** for file uploads

### Frontend (ReactJS + Ant Design)

* **React Context API** for auth state
* **React Hook Form** for handling forms
* **Axios** with `withCredentials` for secure API calls
* **Ant Design** for UI components
* **TailwindCSS** for layout and responsive styling

---

## 📦 Project Structure

```bash
server/
├── src/
│   ├── auth/
│   ├── user/
│   ├── course/
│   ├── lesson/
│   ├── exam/
│   ├── question/
│   ├── result/
│   ├── enrollment/
│   └── document/
```

```bash
client/
├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── query/
│   └── context/
```

---

## 🚀 Getting Started
### Setup Backend

```bash
cd server
npm install
# Create .env file with DB_URL and JWT_SECRET
npm run start:dev
```

### Setup Frontend

```bash
cd client
npm install
npm run dev
```

## ✍️ Author

**Triết Nguyễn**
