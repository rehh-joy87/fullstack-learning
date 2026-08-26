const blogList = document.getElementById("blogList");
const searchInput = document.getElementById("searchInput");

async function loadBlogs(searchTerm = "") {
    try {
        const response = await fetch("http://localhost:3000/blogs");

        if (!response.ok) {
            throw new Error("Failed to load blogs");
        }

        const blogs = await response.json();

        const filteredBlogs = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        blogList.innerHTML = "";

        if (filteredBlogs.length === 0) {
            blogList.innerHTML = "<p>No matching blogs found.</p>";
            return;
        }

        filteredBlogs.forEach(blog => {

            const blogCard = document.createElement("div");

            blogCard.className = "blog-card";

            blogCard.innerHTML = `
                <span class="blog-category">
                    ${blog.category || "Technology"}</span>
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

            blogList.appendChild(blogCard);
        });

    } catch (error) {

        console.error("Error loading blogs:", error);

        blogList.innerHTML =
            "<p>Unable to load blogs. Please make sure the server is running.</p>";
    }
}

searchInput.addEventListener("input", () => {
    loadBlogs(searchInput.value);
});


// VIEW BLOG
function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}


// EDIT BLOG
function editBlog(id) {
    window.location.href = `edit-blog.html?id=${id}`;
}


// DELETE BLOG
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

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete blog");
        }

        alert("Blog deleted successfully!");

        loadBlogs();

    } catch (error) {

        console.error("Error deleting blog:", error);

        alert("Failed to delete blog.");
    }
}


loadBlogs();