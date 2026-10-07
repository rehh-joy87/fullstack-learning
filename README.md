# INKORA — Stories. Ideas. Knowledge.

INKORA is a full-stack blogging platform where users can create, publish, explore, edit, and manage blog posts across different categories.

The application provides a simple and clean platform for sharing stories, ideas, knowledge, and experiences. Visitors can browse published blogs publicly, while registered users can create and manage their own content.

---

## 🌐 Live Project

**Live Website:**  
https://inkora-blog.onrender.com

**GitHub Repository:**  
https://github.com/rehh-joy87/fullstack-learning

---

## 🌟 Project Overview

INKORA is a full-stack web application built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

The application includes:

- User registration and login
- JWT-based authentication
- Protected user functionality
- Blog creation, editing, and deletion
- Image uploads using Cloudinary
- Search functionality
- Category filtering
- User dashboard
- User profile
- My Blogs section
- Responsive design
- MongoDB Atlas database
- Cloud deployment using Render

---

## ✨ Features

### 👤 User Authentication

- User registration
- Secure user login
- JWT authentication
- Protected user pages
- Session-based authentication
- Logout functionality

### 📝 Blog Management

- Create blog posts
- Upload blog images
- Edit blog posts
- Delete blog posts
- View all public blogs
- View individual blog details
- Personal **My Blogs** page

### 🔍 Blog Discovery

- Search blogs
- Filter blogs by category
- Browse public blog posts
- View blog details

### 👤 User Features

- User dashboard
- User profile
- My Blogs
- Protected user functionality

### 📱 Responsive Design

- Responsive web design
- Mobile-friendly interface
- Desktop, tablet, and mobile layouts

---

## 📚 Blog Categories

INKORA currently supports the following categories:

- Technical
- Food
- Travel
- Interior
- Craft
- Music
- Nature
- Dresses
- Climate

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive Web Design

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication & Security

- JSON Web Tokens (JWT)
- bcryptjs
- Authentication middleware
- Environment variables

### Image Storage

- Cloudinary
- Multer

### Other Technologies

- CORS
- REST API

### Deployment

- Render
- GitHub

---

## 📁 Project Structure

```text
INKORA/
│
├── index.html
├── blogs.html
├── blog-details.html
├── categories.html
├── register.html
├── login.html
├── blog.html
├── my-blogs.html
├── edit-blog.html
├── dashboard.html
├── profile.html
│
├── style.css
├── config.js
├── script.js
├── login.js
├── register.js
├── dashboard.js
├── editBlog.js
├── blogDetails.js
├── categoryImages.js
│
├── server.js
├── package.json
├── package-lock.json
│
├── models/
│   ├── User.js
│   └── Blog.js
│
├── middleware/
│   └── auth.js
│
└── uploads/
