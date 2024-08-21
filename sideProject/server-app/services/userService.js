const User = require("../models/UserModel");

const regesterUser = async (data) => {
    const checkExistUser = await User.findOne({ email: data.email });
    if (checkExistUser) {
        throw new Error("User already exists");
    }
    const user = new User(data);
    await user.save();
    return user;
}

const loginUser = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.password !== data.password) {
        throw new Error("Invalid password");
    }
    return user;
}

module.exports = {
    regesterUser,
    loginUser
}