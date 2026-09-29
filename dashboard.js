const token = sessionStorage.getItem("token");


/* =====================================================
   LOGIN CHECK
===================================================== */

if (!token) {
    window.location.href = "login.html";
}


/* =====================================================
   AUTH HEADERS
===================================================== */

function authHeaders() {

    return {
        "Authorization": `Bearer ${token}`
    };

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("user");  

    window.location.href =
        "index.html";

}


document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            logout();

        }
    );


/* =====================================================
   LOAD DASHBOARD
===================================================== */

async function loadDashboard() {

    try {

        const [
            blogsResponse,
            userResponse
        ] = await Promise.all([

            fetch(
                `${API_BASE_URL}/my-blogs`,
                {
                    headers:
                        authHeaders()
                }
            ),

            fetch(
                `${API_BASE_URL}/me`,
                {
                    headers:
                        authHeaders()
                }
            )

        ]);


        /* INVALID TOKEN */

        if (
            blogsResponse.status === 401 ||
            blogsResponse.status === 403 ||
            userResponse.status === 401 ||
            userResponse.status === 403
        ) {

            sessionStorage.removeItem("token");

            sessionStorage.removeItem("user");

            window.location.href =
                "login.html";

            return;

        }


        if (!blogsResponse.ok) {

            throw new Error(
                "Unable to load blogs."
            );

        }


        if (!userResponse.ok) {

            throw new Error(
                "Unable to load user."
            );

        }


        const blogs =
            await blogsResponse.json();


        const user =
            await userResponse.json();


        /* CATEGORIES */

        const categories =
            new Set(
                blogs.map(
                    blog =>
                        blog.category ||
                        "General"
                )
            );


        /* STATS */

        document.getElementById(
            "totalBlogs"
        ).textContent =
            blogs.length;


        document.getElementById(
            "totalCategories"
        ).textContent =
            categories.size;


        document.getElementById(
            "accountName"
        ).textContent =
            user.name || "User";


        /* WELCOME */

        document.getElementById(
            "welcomeTitle"
        ).textContent =
            `Welcome back, ${user.name || "User"}`;


        /* EMAIL */

        document.getElementById(
            "topbarUser"
        ).textContent =
            user.email || "";


        displayRecentBlogs(blogs);

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );


        document.getElementById(
            "recentBlogs"
        ).innerHTML = `

            <div class="dashboard-message">

                Unable to load dashboard data.

                <br><br>

                Please make sure the backend server is running.

            </div>

        `;

    }

}


/* =====================================================
   RECENT BLOGS
===================================================== */

function displayRecentBlogs(blogs) {

    const box =
        document.getElementById(
            "recentBlogs"
        );


    if (!blogs.length) {

        box.innerHTML = `

            <div class="dashboard-message">

                You have not written any blogs yet.

                <br><br>

                <a
                    href="blog.html"
                    class="dashboard-action"
                    style="display:inline-block;"
                >
                    Write Your First Blog
                </a>

            </div>

        `;

        return;

    }


    const recent =
        blogs.slice(0, 5);


    box.innerHTML = "";


    recent.forEach(
        function(blog) {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "recent-blog";


            const category =
                blog.category ||
                "General";


            const title =
                blog.title ||
                "Untitled Blog";


            const content =
                blog.content ||
                "";


            const shortContent =
                content.length > 180
                    ? content.substring(0, 180) + "..."
                    : content;


            article.innerHTML = `

                <span class="recent-category">
                    ${escapeHtml(category)}
                </span>


                <h3>
                    ${escapeHtml(title)}
                </h3>


                <p>
                    ${escapeHtml(shortContent)}
                </p>


                <div class="recent-meta">
                    ${formatDate(blog.createdAt)}
                </div>


                <a
                    href="blog-details.html?id=${encodeURIComponent(blog._id)}"
                    class="recent-link"
                >
                    Read Story →
                </a>

            `;


            box.appendChild(article);

        }
    );

}


/* =====================================================
   START
===================================================== */

loadDashboard();