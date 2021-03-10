//This will be the landing page where users sign in and see a sample of items exchanges on the site


firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
         // Signed in
        console.log('signed in')
        // Sign-out button
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
          <button class="text-pink-500 underline sign-out">Sign Out</button>
        `
        document.querySelector('.sign-out').addEventListener('click', function(event) {
          console.log('sign out clicked')
          firebase.auth().signOut()
          document.location.href = 'index.html'
        })
        document.querySelector('.navigation').innerHTML=`
        <a href = "./post-item.html">Post Item</a>
        `

  } else {
    // Signed out
    console.log('signed out')

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
