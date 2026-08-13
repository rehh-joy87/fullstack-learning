const blogList = document.getElementById("blogList");

async function loadBlogs() {
    try {
        const response = await fetch("http://localhost:3000/blogs");
        const blogs = await response.json();

        blogList.innerHTML = "";

        blogs.forEach(blog => {
            const blogCard = document.createElement("div");

            blogCard.className = "blog-card";

            blogCard.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>

                <button onclick="editBlog(${blog.id})">
                    Edit
                </button>

                <button onclick="deleteBlog(${blog.id})">
                    Delete
                </button>
            `;

            blogList.appendChild(blogCard);
        });

    } catch (error) {
        console.error("Error loading blogs:", error);
        blogList.innerHTML = "<p>Unable to load blogs.</p>";
    }
}


// Edit Blog
async function editBlog(id) {

    const newTitle = prompt("Enter new blog title:");
    const newContent = prompt("Enter new blog content:");

    if (!newTitle || !newContent) {
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
        alert("Unable to update blog.");
    }
}


// Delete Blog
async function deleteBlog(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmation) {
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/blogs/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Unable to delete blog.");
    }
}


// Load blogs when page opens
loadBlogs();