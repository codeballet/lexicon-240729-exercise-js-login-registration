// Global variables
const REGISTER = "Go to Register";
const LOGIN = "Go to Login";
const LOGOUT = "Logout";

// Define page setups
function showLoginPage() {
    document.querySelector("nav>button").innerText = REGISTER;
    document.querySelector("main>h1").innerText = "Login to your account";
    document.querySelector(".register").style.display = "none";
    document.querySelector(".login").style.display = "flex";
}

function showRegisterPage() {
    document.querySelector("nav>button").innerText = LOGIN;
    document.querySelector("main>h1").innerText = "Register an account";
    document.querySelector(".login").style.display = "none";
    document.querySelector(".register").style.display = "flex";
}

function showLoggedinPage() {
    const user = getLoggedinUser();
    document.querySelector("nav>button").innerText = LOGOUT;
    document.querySelector("main>h1").innerText = `Welcome ${user.name}!`;
    document.querySelector(".register").style.display = "none";
    document.querySelector(".login").style.display = "none";
}

// Determine which page to show
if (getLoggedinUser()) {
    showLoggedinPage();
} else if ((document.querySelector("nav>button").innerText = REGISTER)) {
    showLoginPage();
} else {
    showRegisterPage();
}

// Toggle between pages
const toggleButtonRef = document.querySelector(".toggle");
toggleButtonRef.addEventListener("click", (e) => {
    e.preventDefault;
    if (e.target.innerText === LOGIN) {
        showLoginPage();
    } else if (e.target.innerText === REGISTER) {
        showRegisterPage();
    } else {
        // Log out
        removeLoggedinUser();
        showLoginPage();
    }
});

// Get registration datalist from localStorage
function getRegistrationDataList() {
    return JSON.parse(localStorage.getItem("registrations")) || [];
}

// Set registration datalist in localStorage
function setRegistrationDataList(data) {
    let registrations = getRegistrationDataList();
    registrations.push(data);
    localStorage.setItem("registrations", JSON.stringify(registrations));
}

// Get logged in user from localStorage
function getLoggedinUser() {
    return JSON.parse(localStorage.getItem("loggedin"));
}

// Set logged in user in localStorage
function setLoggedinUser(user) {
    localStorage.setItem("loggedin", JSON.stringify(user));
}

// Remove logged in user from localStorage
function removeLoggedinUser() {
    localStorage.removeItem("loggedin");
}

// Validate name
function checkName(name) {
    const pattern = /^[a-zA-Z0-9_]+$/;
    return pattern.test(name);
}

// Check if username exists
function checkUsername(username) {
    const registrations = getRegistrationDataList();
    return registrations.some((user) => user.username === username);
}

// Validate email
function checkEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

// Validate passwords
function checkPasswords(password1, password2) {
    if (password1 === password2 && password1.length > 7) {
        return true;
    }
    return false;
}

// Check if password exists
function checkForPassword(password) {
    const registrations = getRegistrationDataList();
    return registrations.some((user) => user.password === password);
}

// Handle user registration event
const registerFormRef = document.querySelector(".register-form");
registerFormRef.addEventListener("submit", (e) => {
    e.preventDefault;

    // Get form data
    const registerName = e.target.registerName.value;
    const registerUsername = e.target.registerUsername.value;
    const registerEmail = e.target.registerEmail.value;
    const registerPassword1 = e.target.registerPassword1.value;
    const registerPassword2 = e.target.registerPassword2.value;

    // Validate form data
    try {
        if (!checkName(registerName))
            throw new Error(
                "Please use alphanumeric characters for your name."
            );
        if (checkUsername(registerUsername))
            throw new Error("That username is already taken.");
        if (!checkEmail(registerEmail))
            throw new Error("Please use a valid email.");
        if (!checkPasswords(registerPassword1, registerPassword2))
            throw new Error(
                "Please retype your passwords, minimum eight characters."
            );

        // Create user object
        const registrationData = {
            name: registerName,
            username: registerUsername,
            email: registerEmail,
            password: registerPassword1,
        };

        // Add user object to registered users
        setRegistrationDataList(registrationData);

        showLoginPage();
    } catch (err) {
        alert(err);
        console.log(err);
    }
});

// Handle login event
const loginFormRef = document.querySelector(".login-form");
loginFormRef.addEventListener("submit", (e) => {
    e.preventDefault;

    // Get form data
    const loginUsername = e.target.loginUsername.value;
    const loginPassword = e.target.loginPassword.value;

    // Validate form data
    try {
        if (checkUsername(loginUsername) && checkForPassword(loginPassword)) {
            // get user data
            user = getRegistrationDataList().filter(
                (register) => register.username === loginUsername
            )[0];
            // Store user in localStorage
            setLoggedinUser(user);
            // Show greeting page
            showLoggedinPage();
        } else {
            throw new Error("Failed login attempt.");
        }
    } catch (err) {
        showLoginPage();
        alert(err);
        console.log(err);
    }
});
