const express = require('express');
const router = express.Router();
const auth =  require('../middleware/authMidlleware');

const {
    getBlogs,
    createBlogs,
    updateBlog,
    deleteBlogs
} = require('../controllers/blogController');

router.get('/', [auth], getBlogs);

router.post('/', [auth], createBlogs);

router.put('/:id', [auth], updateBlog);

router.delete('/:id', [auth], deleteBlogs);

module.exports = router;