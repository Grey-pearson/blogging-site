const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
        // console.log(err)
    }
});

// create delete option
router.delete('/:id', (req, res) => {
    try {
        console.log(21)
        const commentData = Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        console.log(28)
        if (!commentData) {
            res.status(404).json({ message: 'no comment found with this i' })
            console.log('comment data====================')
        }
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;