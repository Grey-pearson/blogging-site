const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log('post 6')
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      // fields and their updated data
      // title: req.body,
      contents: req.body.contents,
    },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      })
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    console.log('id: ' + req.params.id)
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log(postData)
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
