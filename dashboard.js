const token = localStorage.getItem("token");


// ===============================
// CHECK LOGIN
// ===============================

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ===============================
// LOAD DASHBOARD
// ===============================

async function loadDashboard() {

    try {

        // Get logged-in user
        const userResponse = await fetch(
            "http://localhost:3000/me",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (!userResponse.ok) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }


        const user = await userResponse.json();

        console.log("Logged-in user:", user);


        // Display user information
        document.getElementById("userName").textContent =
            user.name;

        document.getElementById("userEmail").textContent =
            user.email;



        // ===============================
        // GET USER'S BLOGS
        // ===============================

        const blogResponse = await fetch(
            "http://localhost:3000/blogs",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (!blogResponse.ok) {

            throw new Error("Failed to load blogs");

        }


        const blogs = await blogResponse.json();


        const myBlogs =
            document.getElementById("myBlogs");


        myBlogs.innerHTML = "";


        // No blogs
        if (blogs.length === 0) {

            myBlogs.innerHTML =
                "<p>You haven't created any blogs yet.</p>";

            return;

        }


        // Display blogs
        blogs.forEach(blog => {

            const blogCard =
                document.createElement("div");

            blogCard.className = "blog-card";


            blogCard.innerHTML = `

                <span class="blog-category">
                    ${blog.category || "Technology"}
                </span>

                <h3>${blog.title}</h3>

                <p>${blog.content}</p>

                <button onclick="viewBlog('${blog._id}')">
                    View
                </button>

                <button onclick="editBlog('${blog._id}')">
                    Edit
                </button>

                <button onclick="deleteBlog('${blog._id}')">
                    Delete
                </button>

            `;


            myBlogs.appendChild(blogCard);

        });


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// ===============================
// VIEW BLOG
// ===============================

function viewBlog(id) {

    window.location.href =
        `blog-details.html?id=${id}`;

}


// ===============================
// EDIT BLOG
// ===============================

function editBlog(id) {

    window.location.href =
        `edit-blog.html?id=${id}`;

}


// ===============================
// DELETE BLOG
// ===============================

async function deleteBlog(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this blog?");


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to delete blog"
            );

        }


        alert("Blog deleted successfully!");


        loadDashboard();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert("Failed to delete blog.");

    }

}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}


// Start dashboard
loadDashboard();