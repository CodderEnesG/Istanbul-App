import PostMessage from "../models/postMessage.js"
import mongoose from "mongoose";



export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages); //her şey yolunda ise çalıştır
    } catch (error) {
        res.status(404).json({ message: error.message }); //yoksa error
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({...post , creator: req.userId , createdAt: new Date().toISOString() }) //yukarıdan aldığı postu buraya yazar

    try {
        await newPostMessage.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.params; // /posts/id ilk id'ye eşit , _id olan mongoose
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post , _id}, { new: true }); 


    res.json(updatedPost);
}
export const deletePost = async (req , res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    

    res.json({ message: "Post deleted successfully." });
}
export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message:"Unauthenticated"})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId)) //kimin beğendiğini belirlemek için

    if (index === -1) {
        post.likes.push(req.userId); //beğenmek istediğinde
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId)); //dislike
      }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}