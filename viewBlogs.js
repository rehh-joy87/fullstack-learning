const blogList = document.getElementById("blogList");

async function loadBlogs() {
    try {
        const response = await fetch("http://localhost:3000/blogs");
        const blogs = await response.json();

        blogList.innerHTML = "";

        if (blogs.length === 0) {
            blogList.innerHTML = "<p>No blogs available.</p>";
            return;
        }

        blogs.forEach(blog => {

            const blogCard = document.createElement("div");

            blogCard.className = "blog-card";

            blogCard.innerHTML = `
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
`           ;

            blogList.appendChild(blogCard);
        });

    } catch (error) {
        console.error("Error loading blogs:", error);

        blogList.innerHTML =
            "<p>Unable to load blogs. Please make sure the server is running.</p>";
    }
}


async function editBlog(id) {

    const newTitle = prompt("Enter new blog title:");

    if (newTitle === null) {
        return;
    }

    const newContent = prompt("Enter new blog content:");

    if (newContent === null) {
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/blogs/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: newTitle,
                content: newContent
            })

        });

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {

        console.error("Error updating blog:", error);

        alert("Failed to update blog.");

    }
}


async function deleteBlog(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {

        console.error("Error deleting blog:", error);

        alert("Failed to delete blog.");

    }
}

// VIEW BLOG
function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}


loadBlogs();