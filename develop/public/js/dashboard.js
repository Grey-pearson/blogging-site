const newPost = async (event) => {
  event.preventDefault();

  const postText = document.querySelector('#postForm').value
  console.log(postText)
  // get time?
  const time = new Date();

  if (postText) {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ postText, time }),
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
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('#postForm')
  .addEventListener('submit', newPost);

document
  .querySelector('#commentForm')
  .addEventListener('click', newComment);
