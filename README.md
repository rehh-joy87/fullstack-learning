# INKORA — Stories. Ideas. Knowledge.

INKORA is a full-stack blogging platform where users can create, publish, explore, edit, and manage blog posts across different categories.

## 🌐 Project Overview

INKORA provides a simple and clean platform for sharing stories, ideas, knowledge, and experiences.

Users can browse blogs publicly and registered users can create and manage their own blog posts.

## ✨ Features

- User registration
- Secure user login
- JWT authentication
- Protected user pages
- Create blog posts
- Upload blog images
- Edit blog posts
- Delete blog posts
- View all public blogs
- View individual blog details
- Search blogs
- Filter blogs by category
- Personal My Blogs page
- User dashboard
- User profile
- Responsive design
- Mobile-friendly interface
- Logout functionality

## 📚 Blog Categories

INKORA currently supports:

- Technical
- Food
- Travel
- Interior
- Craft
- Music
- Nature
- Dresses
- Climate

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive Web Design

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS

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


🔐 Authentication

INKORA uses JSON Web Tokens (JWT) for authentication.

After login, the JWT token is stored in the browser and sent with protected API requests.

Protected functionality includes:

Creating blogs
Editing blogs
Deleting blogs
Viewing My Blogs
Viewing profile information
Dashboard access
⚙️ Installation

Clone the repository:

git clone https://github.com/rehh-joy87/fullstack-learning.git
