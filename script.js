
function createCart(user) {
  const wrapper = document.createElement('div');
  wrapper.className = 'col-12 col-lg-6 col-md-6';
  const cart = document.createElement('div');
  cart.className = 'user_cart';
  const cartName = document.createElement('div');
  cartName.className = 'user_cart_name';
  const cartNameContent = document.createElement('h2')
  cartNameContent.innerHTML = `Name: ${user.name}`;
  const cartId = document.createElement('div');
  cartId.className = 'user_cart_id';
  const cartIdContent = document.createElement('h2')
  cartIdContent.innerHTML = `Id: ${user.id}`;
  const userCartButton = document.createElement('a');
  userCartButton.className = 'user_cart_button';
  userCartButton.href = 'user-details.html?id=' + user.id;
  userCartButton.innerHTML = 'User Details';
  cartName.appendChild(cartNameContent);
  cartId.appendChild(cartIdContent);
  cart.appendChild(cartName);
  cart.appendChild(cartId);
  cart.appendChild(userCartButton);
  wrapper.appendChild(cart);
  return wrapper;
}

function getUsersList() {
  return fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET'
  })
    .then(response => response.json());
}

function renderUsersList() {
  getUsersList()
    .then(data => {
      data.forEach(user => {
        const cart = createCart(user);
        const userList = document.getElementById('user_wrapper')
        userList.appendChild(cart);
      });
    });
}

function createUserDetailsCart(user) {
  const userDetailsCart = document.createElement('div');
  userDetailsCart.classList.add('user_cart_details');
  userDetailsCart.classList.add('divider');
  userDetailsCart.innerHTML = `
    <h2>Id: ${user.id}</h2>
    <h2>Name: ${user.name}</h2>
    <h2>Username: ${user.username}</h2>
    <h2>Email: ${user.email}</h2>
    <h2>Street: ${user.address.street}</h2>
    <h2>Suite: ${user.address.suite}</h2>
    <h2>City: ${user.address.city}</h2>
    <h2>Zipcode: ${user.address.zipcode}</h2>
    <h2>Lat: ${user.address.geo.lat}</h2>
    <h2>Lng: ${user.address.geo.lng}</h2>
    <h2>Phone: ${user.phone}</h2>
    <h2>Website: ${user.website}</h2>
    <h2>Company name: ${user.company.name}</h2>
    <h2>Catch Phrase: ${user.company.catchPhrase}</h2>
    <h2>Bs: ${user.company.bs}</h2>
  `;
  return userDetailsCart;
}

function getUserDetails(user_id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`, {
    method: 'GET'
  })
    .then(response => response.json())
}

function renderUserDetails(user_id) {
  getUserDetails(user_id)
    .then(user => {
      const userDetailsCart = createUserDetailsCart(user);
      const wrapper = document.getElementById('user-details-wrapper');
      wrapper.appendChild(userDetailsCart);
    })
}

function createPostCart(post) {
  const postCart = document.createElement('div');
  postCart.classList.add('d-flex');
  postCart.classList.add('mb-2r');
  postCart.classList.add('justify-content-between');
  postCart.innerHTML = `
    <p>${post.title}</p>
    <a class="post_of_button" href="post-details.html?id=${post.id}">View</a>
  `;
  return postCart;
}

function getPosts(user_id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${user_id}/posts`, {
    method: 'GET'
  })
    .then(response => response.json())
}

function renderPosts(user_id) {
  getPosts(user_id)
    .then(posts => {
      posts.forEach(post => {
        const postCart = createPostCart(post);
        const wrapper = document.getElementById('post-list');
        wrapper.appendChild(postCart);
      });
    })
}

function getQueryParamsId() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params.id;
}

function getPostDetails(post_id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`, {
    method: 'GET'
  })
    .then(response => response.json())
}


function createUserDetails(username, post_id) {
  console.log(username, post_id)
  const post_details_user = document.createElement('div');
  post_details_user.classList.add('post_details_user');
  post_details_user.innerHTML = `
    <p>#${post_id}</p>
    <p>@${username}</p>
  `;
  return post_details_user;
}

function renderPostDetailsUser(post) {
  return getUserDetails(post.userId)
  .then(user => {
    const post_details_user = createUserDetails(user.username, post.id);
    const post_details = document.getElementById('post_details');
    post_details.appendChild(post_details_user);
    return post;
  })
}

function createPostTitle(post) {
  const post_details_title = document.createElement('div');
  post_details_title.classList.add('post_details_title');
  const title = document.createElement('h1');
  title.innerHTML = post.title;
  post_details_title.appendChild(title);
  return post_details_title;
}

function createPostBody(post) {
  const post_details_body = document.createElement('div');
  post_details_body.classList.add('post_details_body');
  const body = document.createElement('p');
  body.innerHTML = post.body;
  post_details_body.appendChild(body);
  return post_details_body;
}

function createCommentTitle() {
  const comment_title = document.createElement('div');
  comment_title.classList.add('comment_title');
  const title = document.createElement('h1');
  title.innerHTML = 'Comments';
  comment_title.appendChild(title);
  return comment_title;
}

function getComments(post_id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}/comments`, {
    method: 'GET'
  })
    .then(response => response.json())
}

function createCommentCart(comment) {
  const post_details_comment = document.createElement('div');
  post_details_comment.classList.add('post_details_comment');
  post_details_comment.innerHTML = `
    <p>${comment.name}</p>
    <p>${comment.body}</p>
    <div class="post_details_comment_email">
        <p>#${comment.id}</p>
        <p>${comment.email}</p>
    </div>
  `
  return post_details_comment;
}

function renderComments(post_id) {
  return getComments(post_id)
    .then(comments => {
      comments.forEach(comment => {
        const post_details_comment = createCommentCart(comment);
        const post_details = document.getElementById('post_details');
        post_details.appendChild(post_details_comment);
      });
    })
}

function renderPostDetails(post_id) {
  getPostDetails(post_id)
    .then(post => {
      const back_button = document.getElementById('back_button');
      back_button.setAttribute('href', `user-details.html?id=${post.userId}`);
      return renderPostDetailsUser(post);
    })
    .then(post => {
      const post_details = document.getElementById('post_details');
      post_details.appendChild(createPostTitle(post));
      post_details.appendChild(createPostBody(post));
      post_details.appendChild(createCommentTitle());
      renderComments(post_id);
    })
}
