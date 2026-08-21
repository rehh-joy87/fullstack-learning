# Full Stack Learning

This repository contains my daily Full Stack Development practice and assignments.

## 🚀 Day 1 – Environment Setup
- Installed Visual Studio Code
- Installed Node.js
- Installed Git
- Installed Postman
- Created a GitHub repository
- Initialized a Node.js project
- Installed Express.js
- Built and ran a Hello World Express server

## 🌐 Day 2 – HTML
- Created Home page (`index.html`)
- Created Blog page (`blog.html`)
- Added a navigation bar
- Added a footer
- Built the basic structure of a website using HTML

## 🎨 Day 3 – CSS
- Created `style.css`
- Styled the website layout
- Designed the header and navigation bar
- Styled forms and buttons
- Created blog cards
- Added a professional footer
- Improved the overall user interface

## ⚡ Day 4 – JavaScript
- Created `script.js`
- Added an Add Blog form
- Implemented form validation
- Used DOM manipulation
- Handled form submission using events
- Displayed success and error messages
- Improved website interactivity

## 🚀 Day 5 – Express.js

- Created an Express.js backend server
- Configured middleware using `express.json()`
- Implemented a GET route for the home page
- Implemented a GET route to fetch blog data
- Implemented a POST route to receive blog data
- Tested API endpoints using Postman

# 🚀 Day 6 – Add Blog API

## 📌 Objective

Create a REST API using Express.js to add blog posts and store them in a JavaScript array.

---

## 📝 Features

* Created an Express.js server
* Implemented a **GET** API to retrieve all blog posts
* Implemented a **POST** API to add new blog posts
* Stored blog posts in a JavaScript array
* Used `express.json()` middleware to handle JSON request bodies
* Tested the API using Postman

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* JavaScript
* Postman

---

## 📂 API Endpoints

### GET `/blogs`

Returns all blog posts stored in the JavaScript array.

**Example Response**

```json
[
  {
    "id": 1,
    "title": "My First Blog",
    "content": "This is my first blog post."
  }
]
```

---

### POST `/blogs`

Adds a new blog post.

**Request Body**

```json
{
  "title": "Learning Express",
  "content": "Today I created my first Blog API."
}
```

**Response**

```json
{
  "message": "Blog added successfully!",
  "blog": {
    "id": 2,
    "title": "Learning Express",
    "content": "Today I created my first Blog API."
  }
}


## ▶️ How to Run

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

3. Open your browser or Postman.

* Home:

  ```
  http://localhost:3000/
  ```

* View all blogs:

  ```
  http://localhost:3000/blogs
  ```

* Add a blog:

  ```
  POST http://localhost:3000/blogs
  ```

---

## 📚 Learning Outcome

This task helped me understand:

* REST API development using Express.js
* GET and POST HTTP methods
* Handling JSON data with middleware
* Storing data temporarily using a JavaScript array
* Testing APIs with Postman

---

## 🚀 Day 7 – View Blogs

### Objective
Display all blog posts using the GET API.

### Completed Tasks
- Created a GET API (`/blogs`) to retrieve all blog posts.
- Returned blog data stored in a JavaScript array.
- Tested the API using a web browser and Postman.


### Learning Outcome
Learned how to retrieve and return data from a REST API using the GET method.

## 🚀 Day 8 – Edit Blog

### Objective
Allow users to update an existing blog post.

### Completed Tasks
- Implemented a PUT API (`/blogs/:id`) to update blog posts.
- Updated the blog title and content using the blog ID.
- Handled invalid blog IDs with a 404 response.
- Tested the API successfully using Postman.

### Learning Outcome
Learned how to update existing data using the HTTP PUT method in a REST API.


## Day 9: Implement Delete Blog API using Express.js

- Added DELETE /blogs/:id endpoint
- Implemented blog deletion using ID
- Added validation for non-existent blog IDs
- Returned appropriate success and error responses
- Tested DELETE API using Postman


## 🚀 Day 10 – Frontend Integration

### Objective
Connect the HTML frontend with Express.js APIs using the Fetch API.

### Completed Tasks
- Connected the Add Blog page to the Express POST API.
- Connected the Home page to the Express GET API.
- Used the Fetch API to send and receive JSON data.
- Enabled CORS to allow frontend-backend communication.
- Successfully tested the complete blog workflow.

### Learning Outcome
Learned how to connect a frontend application with a backend API using the Fetch API, enabling dynamic data exchange between the client and server.


## Day 11 – UI Enhancements

- Added animations
- Added CSS transitions
- Added hover effects
- Added smooth scrolling
- Added frontend Edit Blog functionality
- Added frontend Delete Blog functionality
- Improved blog card interactions


  ## 🌐 Live Website

The frontend of this project is deployed using GitHub Pages.

Live Website:
[View Live Website](YOUR_GITHUB_PAGES_URL)

## 🚀 Deployment

The frontend was deployed using GitHub Pages.

Note: The Express.js backend currently runs locally using Node.js.


## 🛠️ Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js
- Git
- GitHub
- Postman
- Visual Studio Code
- Fetch API

## 📂 Project Structure

```
fullstack-learning/
│── index.html
│── blog.html
│── style.css
│── script.js
│── server.js
│── package.json
│── package-lock.json
└── README.md
```

## 🎯 Learning Goal

To strengthen my Full Stack Development skills by building practical projects and learning modern web development technologies step by step.

## 👩‍💻 Author

**Reema Joy C**

GitHub: https://github.com/rehh-joy87
