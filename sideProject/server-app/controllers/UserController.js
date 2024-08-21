const userService = require('../services/userService');

const regesterUser = async (req, res) => {
    try {
        const user = await userService.regesterUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }

};

const loginUser = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(201).json({
            message: "User login successfully",
            data: user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }

};

module.exports = {
    regesterUser,
    loginUser
}