const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

//This file essentially sets the /posts as the root level
// anything added in here extra e.g. /layer2 
// would be accessed via localhost:4444/posts/layer2
//It is references by a middleware in the app.js that uses this file as an additional route list
// this makes everything much more readable

// http://localhost:4444/posts/test
router.get('/test', (req, res) => {
    res.send('We are on posts test url');
});


//Gets back all data that has been posted
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({message: err});
    }
});



//Adding an async method before the req, res means that you can call an await on a later method within this call
router.post('/', async (req,res)=> {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    //Returns a promise (a placeholder for value which will be there in the future. basically what is returned to the user when they send a post request)
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json(err);
    }
     // console.log(req.body); Only used to check if the values came through correctly. This body is parsed via the body-parser middleware we use in app.js
});

//Whatever I Add after the /: is a param that I can access like below.
router.get('/:postIdentificationNumberThatIHavePassedInAndCanUseInTheReqParamsAsItAutomaticallyPopulates', async (req,res) => {
    //Whenever we want to get data or submit data. we can use the "Model" that we have made
    try {
        //Because I have exported Post as a mongoose.module (see in the file). I can run lots of queries on it such as findbyId
        const post = await Post.findById(req.params.postIdentificationNumberThatIHavePassedInAndCanUseInTheReqParamsAsItAutomaticallyPopulates);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});

router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json({messsage: "Removed post " + req.params.postId, removedPost: removedPost })
    } catch(err) {
        res.json({message: err});
    }
    
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {

        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title:req.body.title} }
            //The reason you can access req.body. and then .title  is because we've used it before. Intellisense wont automatically populate it.
            );
            res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;