const blogDetails = document.getElementById("blogDetails");

const params = new URLSearchParams(window.location.search);

const blogId = params.get("id");

async function loadBlog() {

    if (!blogId) {
        blogDetails.innerHTML = "<p>Blog not found.</p>";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/blogs/${blogId}`
        );

        const blog = await response.json();

        if (!response.ok) {
            blogDetails.innerHTML = "<p>Blog not found.</p>";
            return;
        }

        blogDetails.innerHTML = `
            <div class="blog-card">

                <h2>${blog.title}</h2>

                <p>${blog.content}</p>

                <br>

                <button onclick="goBack()">
                    Back to Blogs
                </button>

            </div>
        `;

    } catch (error) {

        console.error("Error loading blog:", error);

        blogDetails.innerHTML =
            "<p>Unable to load blog. Please make sure the server is running.</p>";
    }
}

function goBack() {
    window.location.href = "index.html";
}

loadBlog();