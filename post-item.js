firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log(`signed in %o`, user)
    
    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <h1 class="font-bold text-sm text-yellow-600 text-left m-2">Navigation:</h1>
    <button class="font-bold text-xs text-yellow-900 text-center m-2 sign-out">Sign Out</button>
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
  
   
    })


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

 
}
