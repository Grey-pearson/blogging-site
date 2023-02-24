const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData)

  // const posts = await Post.bulkCreate(postData)

  // for (const posts of postData) {
  //   await Post.create({
  //     ...posts,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  await Comment.bulkCreate(commentData)

  // const comment = await Comment.bulkCreate(commentData)

  // for (const comment of commentData) {
  //   await Comment.create({
  //     ...comment,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });

  //   await Comment.create({
  //     ...comment,
  //     post_id: posts[Math.floor(Math.random() * posts.length)].id,
  //   });
  // }
  // console.log(comment)
  process.exit(0);
};

seedDatabase();
