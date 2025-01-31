const postModel = require("../models/post.model");

export const createPost = async (req, res) => {
    const {creatorID, ...others} = req.body;
    const {id} = req.user;
    if (!id) {
        res.status(400).send("log in to make a post")
    }

    try{
        const newPost = new postModel({...others, creatorID: id});
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    if (!userId) {
        res.status(400).send("log in to make a post")
    }

    try{
        const post = await postModel.getById(id);
        if (!id){
            return res.status(400).send("post not found");
        }
        if (userId !== post.creatorID){
            return res.status(400).send("you are not authorized to delete this post");
        }
        await postModel.findByIdAndDelete(id);
        res.status(201).send("post deleted successfully");
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    const {creatorID, ...others} = req.body;
    if (!userId) {
        res.status(400).send("log in to make a post")
    }

    try{
        const post = await postModel.getById(id);
        if (!id){
            return res.status(400).send("post not found");
        }
        if (userId !== post.creatorID){
            return res.status(400).send("you are not authorized to update this post");
        }
        await postModel.findByIdAndUpdate(id, others);
        res.status(201).send("post updated successfully");
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getAllPosts = async (req, res) => {
    try{
        const posts = await postModel.find();
        if (!posts){
            return res.status(400).send("no post found");
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const getPost = async (req, res) => {
    const {id} =  req.params;
    try{
        const posts = await postModel.findById(id);
        if (!posts){
            return res.status(400).send("no post found");
        }
        
        res.status(200).json(posts);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}