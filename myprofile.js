firebase.auth().onAuthStateChanged(async function(user) {

if (user) {
    let db = firebase.firestore()
    
    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })
  
} else {
    document.querySelector('form').classList.add('hidden')

    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'homepage.html'
      }
  
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }

  }) // end of line 1 function







// SECTION 1
// get posts from firestore
// filter to show only my items
// loop through my items

// SECTION 2
// get all swaps from firestore
// filter to show only swap likes for my items
// loop through swap 
