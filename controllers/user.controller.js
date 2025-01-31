const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create a new user
exports.createUser = async (req, res) => {
    const {password, ...others} = req.body;

    
    if (!others.email || !password || !others.username) {
        return res.status(400).send("invalid credentials, send email, username and password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);


    try {
        const user = await userModel.findOne({email: others.email});

        if (user){
            res.status(400).send("user already exists");
        }

        const newUser = new userModel({...others, password: hashPassword});
        await newUser.save();
        return res.status(201).send("user created successfully");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// sign in a user
exports.signin = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("invalid credentials");
    }

    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).send("invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("invalid credentials");
        }

        res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET, {httpOnly: true}));
        return res.status(200).send("login successful");
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

//delete a user
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).send("user not found");
        }
        if (userId !== id) {
            return res.status(400).send("you are not authorized to delete this user");
        }
        await userModel.findByIdAndDelete(id);
        return res.status(200).send("user deleted successfully");
    }catch (error) {
        res.status(400).json({ message: err.message });
    }
}

// update a user
exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {password, ...others} = req.body;
    const {id: userId} = req.user;

    if (userId !== id) {
        return res.status(400).send("you are not authorized to update this user");
    }

    try {
        // see if user with the id exists
        const user =  await userModel.findById(id)
        if (!user){
            return res.status(400).send("user does not exist")
        }
        await userModel.findByIdAndUpdate(id, ...others);
        return res.status(200).send("user updated successfully");
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

//get one user
exports.getUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).send("user not found");
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}