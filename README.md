# INKORA — Stories. Ideas. Knowledge.

INKORA is a full-stack blogging platform where users can create, publish, explore, edit, and manage blog posts across different categories.

The application provides a simple and clean platform for sharing stories, ideas, knowledge, and experiences. Visitors can browse published blogs publicly, while registered users can create and manage their own content.

---

## 🌐 Project Overview

INKORA is built as a full-stack web application with a frontend developed using HTML, CSS, and JavaScript, a Node.js and Express.js backend, and MongoDB for data storage.

The application includes authentication, blog management, image uploads, category filtering, search functionality, user dashboards, and responsive design.

---

## ✨ Features

### 👤 User Authentication

* User registration
* Secure user login
* JWT authentication
* Protected user pages
* Logout functionality

### 📝 Blog Management

* Create blog posts
* Upload blog images
* Edit blog posts
* Delete blog posts
* View all public blogs
* View individual blog details
* Personal **My Blogs** page

### 🔍 Discovery

* Search blogs
* Filter blogs by category
* Browse public blog posts

### 👤 User Features

* User dashboard
* User profile
* Protected user functionality

### 📱 Responsive Design

* Responsive web design
* Mobile-friendly interface
* Optimized layouts for different screen sizes

---

## 📚 Blog Categories

INKORA currently supports the following categories:

* Technical
* Food
* Travel
* Interior
* Craft
* Music
* Nature
* Dresses
* Climate

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs

### Additional Technologies

* Multer — blog image uploads
* CORS — cross-origin request handling

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
```

---

## 🔐 Authentication

INKORA uses **JSON Web Tokens (JWT)** for authentication.

After a successful login, a JWT token is stored in the browser and sent with protected API requests.

Protected functionality includes:

* Creating blogs
* Editing blogs
* Deleting blogs
* Viewing My Blogs
* Viewing profile information
* Dashboard access

Password authentication is handled using **bcryptjs** for password hashing.

---

## 🗄️ Database

INKORA uses **MongoDB** as its database, with **Mongoose** used for database interaction and schema management.

The main database models include:

```text
models/
├── User.js
└── Blog.js
```

### User Model

Stores user-related information required for authentication and profile functionality.

### Blog Model

Stores blog-related information such as blog content, categories, images, and author information.

---

## 🖼️ Image Uploads

INKORA supports uploading images for blog posts.

**Multer** is used on the backend to handle multipart/form-data and process uploaded blog images.

Uploaded files are stored in:

```text
uploads/
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rehh-joy87/fullstack-learning.git
```

### 2. Navigate to the Project

```bash
cd fullstack-learning
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add your MongoDB connection details and any other environment-specific configuration required by the application.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
```

> Do not upload your `.env` file or private credentials to GitHub.

### 5. Start the Server

```bash
node server.js
```

If a development script is configured in `package.json`, you can also use:

```bash
npm run dev
```

### 6. Open the Application

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🧪 Testing

Before deployment, the application was tested for:

* User registration
* User login
* Authentication
* Blog creation
* Blog editing
* Blog deletion
* Blog image uploads
* Public blog listing
* Blog details
* Search
* Category filtering
* User dashboard
* Profile functionality
* Logout
* Responsive design
* Mobile layouts

---

## 📱 Responsive Design

INKORA has been designed to work across different screen sizes.

The interface has been tested for:

* Desktop
* Tablet
* Mobile devices

The responsive design ensures that navigation, blog cards, forms, images, buttons, and other interface elements remain usable on smaller screens.

---

## 🚀 Deployment

**Current Status:** Ready for deployment

The application has been tested locally and the frontend, backend, database integration, authentication, blog functionality, and responsive design have been checked.

The application can be deployed using platforms such as:

* Render
* Vercel
* Netlify

### Live Website

```text
Coming Soon
```

Once deployment is completed, replace the above with the live website URL.

---

## 🔗 Project Links

### GitHub Repository

https://github.com/rehh-joy87/fullstack-learning

### Live Website

Coming Soon

### LinkedIn Project Post

Coming Soon

---

## 🎯 Project Objectives

The main objectives of INKORA are to:

* Build a complete full-stack blogging application
* Implement frontend and backend integration
* Work with MongoDB and Mongoose
* Implement JWT-based authentication
* Implement secure password handling
* Develop CRUD functionality for blog posts
* Implement image upload functionality
* Add search and category filtering
* Create a responsive and mobile-friendly interface
* Practice real-world full-stack development
* Prepare the application for production deployment

---

## 💡 Key Learning Outcomes

Through the development of INKORA, I gained practical experience in:

* Frontend web development
* Backend development using Node.js and Express.js
* MongoDB database integration
* Mongoose schemas and database operations
* JWT authentication
* Password hashing with bcryptjs
* CRUD operations
* File and image uploads using Multer
* API development
* Authentication middleware
* Search and category filtering
* Responsive web design
* Debugging and testing
* Full-stack application development

---

## 👩‍💻 Author

**Reema**

Software Development Graduate

Interested in Software Development, Data Science, Artificial Intelligence, and Machine Learning.

### Connect With Me

* GitHub: https://github.com/rehh-joy87
* LinkedIn: Add your LinkedIn profile URL here

---

## 📄 License

This project was developed as a full-stack web development project for learning, practice, and portfolio purposes.
