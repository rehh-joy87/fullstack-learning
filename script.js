const form = document.getElementById("blogForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("http://localhost:3000/blogs", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            content
        })

    });

    const data = await response.json();

    alert(data.message);

    form.reset();

});