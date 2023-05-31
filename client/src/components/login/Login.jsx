function login(username, password) {
    if (username === "admin" && password === "password") {
        console.log("Login successful");
    } else {
        console.log("Invalid credentials");
    }
}

login("admin", "password"); // Login successful
login("user", "password"); // Invalid credentials


