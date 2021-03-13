firebase.auth().onAuthStateChanged(async function(user) {
    
    let db = firebase.firestore()
    let response = await fetch('/.netlify/functions/get_furniture')
    let json = await response.json()
  
    console.log(json)
    
    if (user) {
console.log('signed in')

// loop through json
for (let i = 0; i < json.length; i++) {
    let post = json[i]
    console.log(post)

    document.querySelector('.all-filter').insertAdjacentHTML('beforeend', `
          <div class="border-4 ${borderClass} p-4 my-4 text-left">
            <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${furniture.itemName}</h2>
              <div class="w-1/2">
                <p class="font-bold text-gray-600">Color: ${furniture.color}</p>
              </div>
              <div class="w-1/2">
              <p class="font-bold text-gray-600">Color: ${furniture.neighborhood}</p>
              </div>
              <div class="w-1/2">
              <p class="font-bold text-gray-600">Color: ${furniture.itemHeight}</p>
              </div>
              <div class="w-1/2">
             <p class="font-bold text-gray-600">Color: ${furniture.itemLength}</p>
             </div>
              <div class="w-1/2">
              <p class="font-bold text-gray-600">Color: ${furniture.itemWidth}</p>
              </div>
              </div>
            </div>
          </div>
        `)
      }
    
  

//insertadjacent

} else {

        // Hide the form when signed-out
        document.querySelector('.posts').classList.add('hidden')
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

// changed "movies" to "posts"
  // Goal:   Refactor the movies application from last week, so that it supports
  //         user login and each user can have their own watchlist.
  
  // Start:  Your starting point is one possible solution for last week's homework.
  
  // Step 1: Add your Firebase configuration to movies.html, along with the
  //         (provided) script tags for all necessary Firebase services – i.e. Firebase
  //         Auth, Firebase Cloud Firestore, and Firebase UI for Auth; also
  //         add the CSS file for FirebaseUI for Auth.
  // Step 2: Change the main event listener from DOMContentLoaded to 
  //         firebase.auth().onAuthStateChanged and include conditional logic 
  //         shows a login UI when signed, and the list of movies when signed
  //         in. Use the provided .sign-in-or-sign-out element to show the
  //         login UI. If a user is signed-in, display a message like "Signed 
  //         in as <name>" along with a link to "Sign out". Ensure that a document
  //         is set in the "users" collection for each user that signs in to 
  //         your application.
  // Step 3: Setting the TMDB movie ID as the document ID on your "watched" collection
  //         will no longer work. The document ID should now be a combination of the
  //         TMDB movie ID and the user ID indicating which user has watched. 
  //         This "composite" ID could simply be `${movieId}-${userId}`. This should 
  //         be set when the "I've watched" button on each movie is clicked. Likewise, 
  //         when the list of movies loads and is shown on the page, only the movies 
  //         watched by the currently logged-in user should be opaque.