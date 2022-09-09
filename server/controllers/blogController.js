const Blog = require('../models/Blog');
const colors = require('colors');

//@desc     Get all blogs by user id
//@route    '/api/blogs
//@access   Private

const getBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find({user: req.user.id});
        res.json(blogs);
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
};

const createBlogs = async(req, res) => {
    try{
        const {title, content} = req.body;
        const newBlog = new Blog({
            title,
            content,
            user: req.user.id
        });

        await newBlog.save();

        if(!newBlog) return res.status(400).json({message: 'Blog failed to create...', type: 'error'});

        res.json(newBlog);
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const updateBlog = async(req, res) => {
    try{
        const {title, content} = req.body;
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {title, content}, {new: true});


        res.json(blog);
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
};

const deleteBlogs = async(req, res) => {
    try{
        const blog = await Blog.findOneAndDelete({_id: req.params.id, user: req.user.id});
        res.json([{message: 'Blog successfully deleted', type: 'success'}]);
        
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getBlogs,
    createBlogs,
    updateBlog,
    deleteBlogs
};