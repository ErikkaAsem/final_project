firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log(`signed in %o`, user)

    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      console.log(event)
      // let postUsername = user.displayName
      let color = document.querySelector('#color').value
      let imageURL = document.querySelector('#imageURL').value
      let neighborhood = document.querySelector('#neighborhood').value
      let itemHeight= document.querySelector('#itemHeight').value
      let itemLength = document.querySelector('#itemLength').value
      let itemName = document.querySelector('#itemName').value
      let itemWidth = document.querySelector('#itemWidth').value
      let response = await fetch('/.netlify/functions/create_post', {
        method: 'POST',
        body: JSON.stringify({
          color: color, 
          imageURL: imageURL, 
          itemHeight: itemHeight, 
          itemLength: itemLength, 
          itemName: itemName, 
          itemWidth: itemWidth, 
          neighborhood: neighborhood, 
          userName: user.displayName,
          userEmail: user.email,
        })
      })
  
      // document.querySelector('#image-url').value = '' // clear the image url field
      // renderPost(postId, postUsername, postImageUrl, numberOfLikes)
    })

    // let response = await fetch('/.netlify/functions/get_posts')
    // let posts = await response.json()
    // for (let i=0; i<posts.length; i++) {
    //   let post = posts[i]
    //   renderPost(post.id, post.username, post.imageUrl, post.likes)
    // }
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
      signInSuccessUrl: 'post-item.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

// given a single post Object, render the HTML and attach event listeners
// expects attributes from an Object that looks similar to:
// {
//   id: 'abcdefg',
//   username: 'brian',
//   imageUrl: 'https://images.unsplash.com/...',
//   likes: 12
// }
async function renderPost(postId, username, imageUrl, likes) {
  document.querySelector('.posts').insertAdjacentHTML('beforeend', `
    <div class="post-${postId} md:mt-16 mt-8 space-y-8">
      <div class="md:mx-0 mx-4">
        <span class="font-bold text-xl">${username}</span>
      </div>

      <div>
        <img src="${imageUrl}" class="w-full">
      </div>

      <div class="text-3xl md:mx-0 mx-4">
        <button class="like-button">❤️</button>
        <span class="likes">${likes}</span>
      </div>
    </div>
  `)

  // listen for the like button on this post
  // let likeButton = document.querySelector(`.post-${postId} .like-button`)
  // likeButton.addEventListener('click', async function(event) {
  //   event.preventDefault()
  //   console.log(`post ${postId} like button clicked!`)
  //   let currentUserId = firebase.auth().currentUser.uid

    // 🔥🔥🔥 Code-Along
    // POST fetch() the /like API endpoint and test for success
    // Step 1:    Write a fetch() POST request to `/.netlify/functions/like`
    //            (we've already written the skeleton of the /like lambda function for you).
    //            Send the post's id and the user's id along in the body of the request
    //            so that the backend can create the like for the correct post/user combination.
    //            Be sure to use `JSON.stringify()` for the body object.
    // Step 2-5:  Implement the lambda function in like.js
    // Step 6:    Wrap the code below that visually increments the likes count in conditional logic
    //            so that it doesn't increment unless the backend added the like. Use either
    //            the response's body or the status code.
    // 🔥🔥🔥 End Code-Along

    // let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
    // let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
    // document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
  // })
}
