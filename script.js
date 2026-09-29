const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const form = document.getElementById("blogForm");
const message = document.getElementById("message");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const publishButton = document.getElementById("publishButton");
const logoutButton = document.getElementById("logoutButton");


function showMessage(text, type) {
    message.textContent = text;
    message.className = `form-message ${type}`;
}


/* =========================
   IMAGE PREVIEW
========================= */

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        previewImage.src = "";
        imagePreview.classList.add("hidden");
        return;
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

        showMessage(
            "Only JPG, PNG and WEBP images are allowed.",
            "error"
        );

        imageInput.value = "";
        previewImage.src = "";
        imagePreview.classList.add("hidden");

        return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {

        showMessage(
            "Image must be smaller than 5 MB.",
            "error"
        );

        imageInput.value = "";
        previewImage.src = "";
        imagePreview.classList.add("hidden");

        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        previewImage.src = event.target.result;
        imagePreview.classList.remove("hidden");

    };

    reader.readAsDataURL(file);
});


/* =========================
   CREATE BLOG
========================= */

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const title = document
        .getElementById("title")
        .value
        .trim();

    const category = document
        .getElementById("category")
        .value;

    const content = document
        .getElementById("content")
        .value
        .trim();

    const image = imageInput.files[0];


    /* VALIDATION */

    if (!title || !category || !content) {

        showMessage(
            "Please fill in the title, category and content.",
            "error"
        );

        return;
    }


    if (image) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(image.type)) {

            showMessage(
                "Only JPG, PNG and WEBP images are allowed.",
                "error"
            );

            return;
        }


        const maximumSize = 5 * 1024 * 1024;

        if (image.size > maximumSize) {

            showMessage(
                "Image must be smaller than 5 MB.",
                "error"
            );

            return;
        }
    }


    try {

        publishButton.disabled = true;
        publishButton.textContent = "Publishing...";


        /* CREATE FORM DATA */

        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }


        /* SEND TO BACKEND */

        const response = await fetch(
            `${API_BASE_URL}/blogs`,
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${token}`
                },

                body: formData
            }
        );


        /* READ RESPONSE */

        const data = await response.json();


        /* INVALID / EXPIRED TOKEN */

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");

            window.location.href = "login.html";

            return;
        }


        /* SERVER ERROR */

        if (!response.ok) {

            throw new Error(
                data.message || "Failed to create blog."
            );
        }


        /* SUCCESS */

        showMessage(
            "Blog published successfully! Redirecting to My Blogs...",
            "success"
        );


        /*
         IMPORTANT:
         Redirect immediately after successful creation.
        */

        window.location.replace("my-blogs.html");


    } catch (error) {

        console.error(
            "Create blog error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to publish blog. Make sure the server is running.",
            "error"
        );


        publishButton.disabled = false;
        publishButton.textContent = "Publish Blog";
    }

});


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        window.location.href = "index.html";
    }
);