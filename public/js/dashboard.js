// const { put } = require("../../controllers/api/postRoutes");

const newPost = async (event) => {
  event.preventDefault();

  const contents = document.querySelector('#post').value
  const title = document.querySelector('#title').value
  const date_created = new Date();

  if (contents) {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title, contents, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('cannot create post');
    }
  }
};

const newComment = async (event) => {
  event.preventDefault();

  const thisForm = event.target

  const text = thisForm.querySelector('.comment').value
  const date_created = new Date();
  // getting the id of the post its connected to
  const post_id = thisForm.id
  console.log(post_id)

  if (text) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ text, date_created, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('cannot create post');
    }
  } else {
    alert('no text to post')
  }
};

document
  .querySelector('#postForm')
  .addEventListener('submit', newPost);

document
  .querySelectorAll('.commentForm')
  .forEach(element => element.addEventListener('submit', newComment))

// update
document
  .querySelectorAll('.update')
  .forEach(element => element.addEventListener('click', async function () {

    let updateForm = `
    <div class="card">
      <form action="submit" class="updatePostForm">
        <input class="input updateText" type="text" placeholder="updated text here">
        <button type="submit">update post</button>
      </form>
    </div>
    `
    const postId = element.dataset.postId
    console.log(postId)
    element.parentElement.parentElement.querySelector('.editButtons').classList.add('is-hidden')

    element.parentElement.insertAdjacentHTML('beforebegin', updateForm)

    document.querySelector('.updatePostForm').addEventListener('submit', async function (event) {
      event.preventDefault()

      let contents = document.querySelector('.updateText').value
      console.log(postId)

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/dashboard')
      } else {
        alert('failed to update')
      }
    })



  }))

// delete
document
  .querySelectorAll('.remove')
  .forEach(element => element.addEventListener('click', async function () {

    const postId = element.dataset.postId
    console.log(postId)

    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert('failed to delete')
    }
  }))