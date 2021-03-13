//This will be the landing page where users sign in and see a sample of items exchanges on the site


firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
         // Signed in
        console.log('signed in')
        // Sign-out button
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
          <button class="font-bold text-xs text-yellow-900 text-center sign-out">Sign Out</button>
        `
        document.querySelector('.sign-out').addEventListener('click', function(event) {
          console.log('sign out clicked')
          firebase.auth().signOut()
          document.location.href = 'index.html'
        })
        document.querySelector('.navigation').innerHTML=`
        <p><a class="font-bold text-xs text-yellow-900 text-center" href = "./post-item.html">Post Item</a></p>
        <p><a class="font-bold text-xs text-yellow-900 text-center" href = "./homepage2.html">View Available Items</a></p>
        <p> <a class="font-bold text-xs text-yellow-900 text-center" href = "./myprofile.html">My Profile</a></p>
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
