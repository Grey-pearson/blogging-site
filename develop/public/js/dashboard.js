
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


// can only add comments on top post
// comments apear blank
// other posts just give /return error
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
//.addEventListener('submit', newComment);


// update

// delete
document
  .querySelectorAll('.remove')
  .forEach(element => element.addEventListener('click', async function () {
    // console.log(element)
    const postId = element.dataset.postId
    console.log(postId)

    const response = await fetch(`/api/comments/delete/${postId}`, {
      method: 'DELETE',
      // body: JSON.stringify({ text, date_created, post_id }),
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

  }))