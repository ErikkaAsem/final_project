firebase.auth().onAuthStateChanged(async function(user) {
    
    let db = firebase.firestore()
    let response = await fetch('/.netlify/functions/get_furniture')
    let json = await response.json()
    let posts = json.results
    console.log(posts)
    
    if (user) {
console.log('signed in')

function colorFilter(post) {
    let colorFilter
    if (furniture.color == 'gold') {
        colorFilter = 'Gold'
    } else if (furniture.color == 'green') {
        colorFilter = 'Green'
    } else if (furniture.color == 'white') {
        colorFilter = 'White'
    } else if (furniture.color == 'silver') {
        colorFilter = 'Silver'
    } else if (furniture.color == 'off-white') {
        colorFilter = 'Off-White'
    } else if (furniture.color == 'black') {
        colorFilter = 'Black'
    } else if (furniture.color == 'grey') {
        colorFilter = 'Grey'
    } else if (furniture.color == 'blue') {
        colorFilter = 'Blue'
    } else if (furniture.color == 'brown') {
        colorFilter = 'Brown'
    } else {
        colorFilter = 'Multi'
    }
    return colorFilter
  }

  function renderFurniture(furnitureArray) {
    for (let i = 0; i < furnitureArray.length; i++) {
      let furniture = furnitureArray[i]
  
  
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
    }
  }

  window.addEventListener('DOMContentLoaded', function() {

    let allFurniture = document.querySelector('#all-filter')
allRides.addEventListener('click', async function(event) {
  
// request the ride data from our "API"
event.preventDefault()
document.querySelector('.posts').innerHTML = ''

let response = await fetch('/.netlify/functions/get_furniture')
let json = await response.json()
// !!pass the array of rides to the provided renderRides() function to display all the rides (same as they appeared at the end of last week's assignment)
//renderRides(allRides)
renderFurniture(json)
 
})

// (2 points) Add an event listener to the "Noober Purple" button, so that when it is clicked, there is some output in the console to indicate which button was clicked.
let white = document.querySelector('#white-filter')
white.addEventListener('click', async function(event) {
  console.log(event.target.innerHTML)

// (4 points) When the event occurs:
// request the ride data from our "API"
event.preventDefault()

let response = await fetch('/.netlify/functions/get_furniture')
let json = await response.json()
// create a new empty array
document.querySelector('.posts').innerHTML = ''
let furnitureArray = []
// loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array

  for (let i = 0; i < json.length; i++) {
    let post = json[i]
    console.log(post)

    colorFilter(post)
    console.log(colorFilter(post))

    
if (colorFilter(post) == 'white') {
  furnitureArray.push(post) 
} 
  }
  renderFurniture(furnitureArray)
})
 //   db.collection('users').doc(user.uid).set({
 //       name: user.displayName,
 //       email: user.email
 //     })

 //   document.querySelector('.sign-in-or-sign-out').addEventListener('submit', async function(event) {
 //       event.preventDevault()
 //   })
   // Sign-out button
   console.log(user)
   document.querySelector('.sign-in-or-sign-out').innerHTML = `
   Signed in as ${user.displayName}
   <button class="text-pink-500 underline sign-out">Sign Out</button>
 `
 document.querySelector('.sign-in-or-sign-out').addEventListener('click', function(event) {
   console.log('sign out clicked')
   firebase.auth().signOut()
   document.location.href = 'index.html'
 })
 




  //  for (let i=0; i<posts.length; i++) {
    //  let post = posts[i]
      //let docRef = await db.collection('furniture').doc(`${post.id}`).get()
      //let makeTrade = docRef.data()
      //let opacityClass = ''
      //if (makeTrade) {
      //  opacityClass = 'opacity-20'
     // }
  //NOT SURE WHAT TO DO FOR THE WATCHED_BUTTON BELOW
      document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="w-1/5 p-4 post-${post.id} ${opacityClass}">
          <img src="${post.imageURL}" class="w-full">
          <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">Let's make a trade</a>
        </div>
      `)
      
      document.querySelector(`.post-${post.id}`).addEventListener('click', async function(event) {
        event.preventDefault()
        let postElement = document.querySelector(`.post-${post.id}`)
        postElement.classList.add('opacity-20')
        console.log(user)
        await db.collection('trade').doc(`${post.id}-${user.email}`).set({})
      }) 
    

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
}  
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