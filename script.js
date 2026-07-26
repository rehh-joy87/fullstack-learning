const form = document.getElementById("blogForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Blog added successfully!";
    message.style.color = "green";

    form.reset();
});