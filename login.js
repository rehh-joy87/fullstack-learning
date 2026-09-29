const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.textContent = "";
    loginMessage.className = "form-message";

    if (!email || !password) {
        loginMessage.textContent = "Please enter email and password.";
        loginMessage.classList.add("error");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Save JWT token
        sessionStorage.setItem("token", data.token);

        // Save user information
        if (data.user) {
            sessionStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
        }

        loginMessage.textContent = "Login successful.";
        loginMessage.classList.add("success");

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {
        console.error("Login error:", error);

        loginMessage.textContent =
            error.message ||
            "Unable to login. Make sure the server is running.";

        loginMessage.classList.add("error");
    }
});