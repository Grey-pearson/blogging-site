const login = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value
  const password = document.querySelector('#password-login').value

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
      console.log('response is ok')
    } else {
      alert(response.statusText);
      console.log(response.statusText)
    }
  }
};

const signUp = async (event) => {
  event.preventDefault();
  console.log('new user')

  const username = document.querySelector('#username-signup').value
  const password = document.querySelector('#password-signup').value.trim();
  console.log('checking if ok')
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('response is ok')
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
      console.log(response.statusText)
    }
  }
};

document
  .querySelector('#loginform')
  .addEventListener('submit', login);

document
  .querySelector('#signupform')
  .addEventListener('submit', signUp);
