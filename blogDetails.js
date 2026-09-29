const blogId = new URLSearchParams(window.location.search).get("id");

const blogContainer = document.getElementById("blogContainer");
const authLinks = document.getElementById("authLinks");
const logoutButton = document.getElementById("logoutButton");

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function formatDate(dateValue) {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function getImageUrl(imageUrl) {
    if (!imageUrl) return "";

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
    }

    return `${API_BASE_URL}${imageUrl}`;
}

function updateNavigation() {
    const token = sessionStorage.getItem("token");

    if (token) {
        authLinks.innerHTML = `
            <a href="my-blogs.html">My Blogs</a>
            <a href="profile.html">Profile</a>
            <a href="#" id="logoutButton">Logout</a>
        `;

        document
            .getElementById("logoutButton")
            .addEventListener("click", function (event) {
                event.preventDefault();

                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");

                window.location.href = "index.html";
            });
    } else {
        authLinks.innerHTML = `
            <a href="register.html">Register</a>
            <a href="login.html">Login</a>
        `;
    }
}

async function loadBlog() {
    if (!blogId) {
        blogContainer.innerHTML = `
            <div class="blog-message">
                <h2>Blog not found</h2>
                <p>No blog ID was provided.</p>
                <a href="blogs.html" class="secondary-button">
                    Back to Blogs
                </a>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/blogs/${encodeURIComponent(blogId)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load this blog.");
        }

        const blog = data.blog || data;

        const title = blog.title || "Untitled Blog";
        const content = blog.content || "";
        const category = blog.category || "General";
        const createdAt = formatDate(blog.createdAt);
        const imageUrl = getImageUrl(blog.imageUrl);

        blogContainer.innerHTML = `
            <article class="blog-detail-card">

                <div class="blog-detail-category">
                    ${escapeHtml(category)}
                </div>

                <h1>${escapeHtml(title)}</h1>

                <div class="blog-detail-date">
                    Published on ${createdAt}
                </div>

                ${
                    imageUrl
                        ? `
                            <div class="blog-detail-image">
                                <img
                                    src="${escapeHtml(imageUrl)}"
                                    alt="${escapeHtml(title)}"
                                >
                            </div>
                        `
                        : ""
                }

                <div class="blog-detail-content">
                    ${escapeHtml(content).replace(/\n/g, "<br>")}
                </div>

                <div class="blog-detail-footer">
                    <a href="blogs.html" class="secondary-button">
                        ← Back to Blogs
                    </a>
                </div>

            </article>
        `;
    } catch (error) {
        console.error("Blog details error:", error);

        blogContainer.innerHTML = `
            <div class="blog-message">
                <h2>Unable to load blog</h2>
                <p>
                    ${escapeHtml(
                        error.message ||
                        "Please make sure the backend server is running."
                    )}
                </p>

                <a href="blogs.html" class="secondary-button">
                    Back to Blogs
                </a>
            </div>
        `;
    }
}

updateNavigation();
loadBlog();