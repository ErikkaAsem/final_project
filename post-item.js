//This page is to post a new item
//link to user profile
    //<p class='m-auto text-center'><a class="text-green-500 font-bold" href="Index.html">User Profile</a></p>
//link to sign out
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'

//link to return to available items
    //<p class='m-auto text-center'><a class="text-green-500 font-bold" href="Index.html">View Available Items</a></p>
//site name
//post new item
//image name
//item dimensions
//color
//neighborhood
//image URL
//post


//the code below is from Kellogram and needs to be updated

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault()
    let postItem = user.displayName
    let postImageUrl = document.querySelector('#image-url').value
    let response = await fetch('/.netlify/functions/create_post', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.uid,
        username: postUsername,
        imageUrl: postImageUrl
      })
    })
    let post = await response.json()
    document.querySelector('#image-url').value = '' // clear the image url field
    renderPost(post)
  })

  let response = await fetch('/.netlify/functions/get_posts')
  let posts = await response.json()
  for (let i=0; i<posts.length; i++) {
    let post = posts[i]
    renderPost(post)
  }
} else {
  // Signed out
  console.log('signed out')

  // Hide the form when signed-out
  document.querySelector('form').classList.add('hidden')

  // Initializes FirebaseUI Auth
  let ui = new firebaseui.auth.AuthUI(firebase.auth())

  // FirebaseUI configuration
  let authUIConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'index.html'
  }

  // Starts FirebaseUI Auth
  ui.start('.sign-in-or-sign-out', authUIConfig)
}
})

// given a single post Object, render the HTML and attach event listeners
// expects an Object that looks similar to:
// {
//   id: 'abcdefg',
//   username: 'brian',
//   imageUrl: 'https://images.unsplash.com/...',
//   likes: 12,
//   comments: [
//     { username: 'brian', text: 'i love tacos!' },
//     { username: 'ben', text: 'fake news' }
//   ]
// }
async function renderPost(post) {
let postId = post.id
document.querySelector('.posts').insertAdjacentHTML('beforeend', `
  <div class="post-${postId} md:mt-16 mt-8 space-y-8">
    <div class="md:mx-0 mx-4">
      <span class="font-bold text-xl">${post.username}</span>
    </div>
    <div>
      <img src="${post.imageUrl}" class="w-full">
    </div>
    <div class="text-3xl md:mx-0 mx-4">
      <button class="like-button">❤️</button>
      <span class="likes">${post.likes}</span>
    </div>
    <div class="comments text-sm md:mx-0 mx-4 space-y-2">
      ${renderComments(post.comments)}
    </div>
    <div class="w-full md:mx-0 mx-4">
      ${renderCommentForm()}
    </div>
  </div>
`)

// listen for the like button on this post
let likeButton = document.querySelector(`.post-${postId} .like-button`)
likeButton.addEventListener('click', async function(event) {
  event.preventDefault()
  console.log(`post ${postId} like button clicked!`)
  let currentUserId = firebase.auth().currentUser.uid

  let response = await fetch('/.netlify/functions/like', {
    method: 'POST',
    body: JSON.stringify({
      postId: postId,
      userId: currentUserId
    })
  })
  if (response.ok) {
    let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
    let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
    document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
  }
})
