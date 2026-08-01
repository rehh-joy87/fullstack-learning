const blogList = document.getElementById("blogList");

fetch("http://localhost:3000/blogs")
    .then(response => response.json())
    .then(blogs => {
        blogs.forEach(blog => {
            const card = document.createElement("div");

            card.className = "blog-card";

            card.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            `;

            blogList.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });