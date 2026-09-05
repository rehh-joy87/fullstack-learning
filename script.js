const form = document.getElementById("blogForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !content || !category) {
        alert("Please enter all fields.");
        return;
    }

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        const response = await fetch(
            "http://localhost:3000/blogs",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

            body: JSON.stringify({
                title: title,
                content: content,
                category: category
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add blog");
        }

        alert("Blog added successfully!");

        // Redirect to Home page
        window.location.href = "index.html";

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to add blog. Make sure the server is running.");

    }

});