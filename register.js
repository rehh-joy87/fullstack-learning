const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");


// ========================================
// REGISTER
// ========================================

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Reset message
    registerMessage.textContent = "";
    registerMessage.className = "form-message";


    // ========================================
    // VALIDATION
    // ========================================

    if (!name || !email || !password || !confirmPassword) {

        registerMessage.textContent =
            "Please fill in all fields.";

        registerMessage.classList.add("error");

        return;
    }


    if (password !== confirmPassword) {

        registerMessage.textContent =
            "Passwords do not match.";

        registerMessage.classList.add("error");

        return;
    }


    // ========================================
    // SEND REGISTRATION REQUEST
    // ========================================

    try {

        const response = await fetch(
            `${API_BASE_URL}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        // ========================================
        // HANDLE ERROR
        // ========================================

        if (!response.ok) {

            throw new Error(
                data.message || "Registration failed."
            );
        }


        // ========================================
        // SUCCESS
        // ========================================

        registerMessage.textContent =
            "Registration successful. Redirecting to login...";

        registerMessage.classList.add("success");


        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        registerMessage.textContent =
            error.message ||
            "Unable to register. Make sure the server is running.";

        registerMessage.classList.add("error");
    }

});