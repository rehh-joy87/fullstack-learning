const blogList = document.getElementById("blogList");

async function loadBlogs() {
    try {
        const response = await fetch("http://localhost:3000/blogs");

        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const blogs = await response.json();

        blogList.innerHTML = "";

        blogs.forEach(blog => {

            const blogCard = document.createElement("div");

            blogCard.className = "blog-card";

            blogCard.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>

                <button class="edit-btn" data-id="${blog.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${blog.id}">
                    Delete
                </button>
            `;

            blogList.appendChild(blogCard);
        });

        // Edit buttons
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", () => {
                editBlog(button.dataset.id);
            });
        });

        // Delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => {
                deleteBlog(button.dataset.id);
            });
        });

    } catch (error) {
        console.error(error);
        blogList.innerHTML = "<p>Unable to load blogs.</p>";
    }
}


// EDIT BLOG
async function editBlog(id) {

    const title = prompt("Enter new blog title:");

    if (title === null) {
        return;
    }

    const content = prompt("Enter new blog content:");

    if (content === null) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);

        loadBlogs();

    } catch (error) {
        console.error(error);
        alert("Unable to update blog.");
    }
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
            throw new Error(data.message);
        }

        alert(data.message);

        loadBlogs();

    } catch (error) {
        console.error(error);
        alert("Unable to delete blog.");
    }
}


// Load blogs when page opens
loadBlogs();