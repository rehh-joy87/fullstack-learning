const bcrypt = require("bcryptjs");

async function createHash() {
    const password = "testpassword";

    const hash = await bcrypt.hash(password, 10);

    console.log("Original password:", password);
    console.log("Hashed password:", hash);
}

createHash();