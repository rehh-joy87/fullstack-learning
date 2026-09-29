const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


const params = new URLSearchParams(
    window.location.search
);

const blogId = params.get("id");


const form = document.getElementById("editForm");

const titleInput = document.getElementById("title");

const categoryInput = document.getElementById("category");

const contentInput = document.getElementById("content");

const imageInput = document.getElementById("image");

const imagePreview = document.getElementById("imagePreview");

const previewImage = document.getElementById("previewImage");

const currentImageGroup =
    document.getElementById("currentImageGroup");

const currentImage =
    document.getElementById("currentImage");

const message =
    document.getElementById("message");

const saveButton =
    document.getElementById("saveButton");

const logoutButton =
    document.getElementById("logoutButton");


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        `form-message ${type}`;

}


/* =====================================================
   IMAGE URL
===================================================== */

function getImageUrl(imageUrl) {

    if (!imageUrl) {
        return "";
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${API_BASE_URL}${imageUrl}`;

}


/* =====================================================
   LOAD BLOG
===================================================== */

async function loadBlog() {

    if (!blogId) {

        showMessage(
            "Blog ID is missing.",
            "error"
        );

        form.style.display = "none";

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/blogs/${encodeURIComponent(blogId)}`
        );


        const blog = await response.json();


        if (!response.ok) {

            throw new Error(
                blog.message ||
                "Blog not found."
            );

        }


        titleInput.value =
            blog.title || "";


        categoryInput.value =
            blog.category || "Technical";


        contentInput.value =
            blog.content || "";


        /* CURRENT IMAGE */

        if (blog.imageUrl) {

            const imageUrl =
                getImageUrl(blog.imageUrl);

            currentImage.src =
                imageUrl;

            currentImageGroup.style.display =
                "block";

        }


    } catch (error) {

        console.error(
            "Load blog error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to load blog.",
            "error"
        );

        form.style.display = "none";

    }

}


/* =====================================================
   IMAGE PREVIEW
===================================================== */

imageInput.addEventListener(
    "change",
    function () {

        const file =
            imageInput.files[0];


        if (!file) {

            previewImage.src = "";

            imagePreview.classList.add(
                "hidden"
            );

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

            imagePreview.classList.add(
                "hidden"
            );

            return;

        }


        const maximumSize =
            5 * 1024 * 1024;


        if (file.size > maximumSize) {

            showMessage(
                "Image must be smaller than 5 MB.",
                "error"
            );

            imageInput.value = "";

            previewImage.src = "";

            imagePreview.classList.add(
                "hidden"
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                previewImage.src =
                    event.target.result;

                imagePreview.classList.remove(
                    "hidden"
                );

            };


        reader.readAsDataURL(file);

    }
);


/* =====================================================
   UPDATE BLOG
===================================================== */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const title =
            titleInput.value.trim();


        const category =
            categoryInput.value;


        const content =
            contentInput.value.trim();


        const image =
            imageInput.files[0];


        if (!title || !category || !content) {

            showMessage(
                "Please fill in the title, category and content.",
                "error"
            );

            return;

        }


        /* IMAGE VALIDATION */

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


            const maximumSize =
                5 * 1024 * 1024;


            if (image.size > maximumSize) {

                showMessage(
                    "Image must be smaller than 5 MB.",
                    "error"
                );

                return;

            }

        }


        try {

            saveButton.disabled = true;

            saveButton.textContent =
                "Saving...";


            const formData =
                new FormData();


            formData.append(
                "title",
                title
            );


            formData.append(
                "category",
                category
            );


            formData.append(
                "content",
                content
            );


            if (image) {

                formData.append(
                    "image",
                    image
                );

            }


            const response =
                await fetch(
                    `${API_BASE_URL}/blogs/${encodeURIComponent(blogId)}`,
                    {
                        method: "PUT",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );


            const data =
                await response.json();


            /* TOKEN EXPIRED */

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                sessionStorage.removeItem(
                    "token"
                );

                sessionStorage.removeItem(
                    "user"
                );

                window.location.href =
                    "login.html";

                return;

            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update blog."
                );

            }


            showMessage(
                "Blog updated successfully!",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "my-blogs.html";

                },
                900
            );


        } catch (error) {

            console.error(
                "Update blog error:",
                error
            );


            showMessage(
                error.message ||
                "Unable to update blog.",
                "error"
            );


        } finally {

            saveButton.disabled =
                false;

            saveButton.textContent =
                "Save Changes";

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        sessionStorage.removeItem(
            "token"
        );

        sessionStorage.removeItem(
            "user"
        );


        window.location.href =
            "index.html";

    }
);


/* =====================================================
   START
===================================================== */

loadBlog();