const form = document.getElementById("editBlogForm");

const titleInput = document.getElementById("title");

const contentInput = document.getElementById("content");

const params = new URLSearchParams(window.location.search);

const blogId = params.get("id");


// Load existing blog
async function loadBlog() {

    if (!blogId) {
        alert("Blog ID not found.");
        window.location.href = "index.html";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${blogId}`
        );

        if (!response.ok) {
            throw new Error("Blog not found");
        }

        const blog = await response.json();

        titleInput.value = blog.title;

        contentInput.value = blog.content;

    } catch (error) {

        console.error(error);

        alert("Unable to load blog.");

        window.location.href = "index.html";
    }
}


// Update blog
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = titleInput.value.trim();

    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Please fill in all fields.");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${blogId}`,
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
            throw new Error(data.message || "Update failed");
        }

        alert("Blog updated successfully!");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert("Failed to update blog.");

    }

});


function goBack() {
    window.location.href = "index.html";
}


loadBlog();