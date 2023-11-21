const login = async (req, res) => {
    // create session
    res.json({
        message: "Login",
    });
}

const logout = async (req, res) => {
    // close session
    res.json({
        message: "Logout",
    });
}

export {
    login,
    logout
}