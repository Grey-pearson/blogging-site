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

  const contents = document.querySelector('#comment').value
  const date_created = new Date();
  const post_id = 

  if (contents) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ title, contents, date_created, post_id }),
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

document
  .querySelector('#postForm')
  .addEventListener('submit', newPost);

document
  .querySelector('#commentForm')
  .addEventListener('submit', newComment);
