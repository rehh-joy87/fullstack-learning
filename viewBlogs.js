async function loadBlogs() {

    const response = await fetch("http://localhost:3000/blogs");

    const blogs = await response.json();

    const blogList = document.getElementById("blogList");

    blogList.innerHTML = "";

    blogs.forEach(blog => {

        blogList.innerHTML += `
            <div class="blog-card">
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            </div>
        `;

    });

}

loadBlogs();