firebase.auth().onAuthStateChanged(async function(user) {
let db = firebase.firestore()

if (user) {

    console.log('signed in')

    document.querySelector('.sign-in-or-sign-out').innerHTML = (`
    <h1 class="font-bold text-sm text-yellow-600 text-left m-2">Navigation:</h1>
    <button class="font-bold text-xs text-yellow-900 text-center m-2 sign-out">Sign Out</button>
    `)
    
    document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
    })

    let username = user.displayName
    let email = user.email
    let uid = user.uid
    console.log(username)
    console.log(email)
    console.log(uid)

    let db = firebase.firestore()

    let furnitureQuery = await fetch(`/.netlify/functions/get_furniture?userEmail=${email}`)
    let posts = await furnitureQuery.json()
    console.log(posts)

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i]

      document.querySelector('.my-items').insertAdjacentHTML('beforeend', `
        <div class="flex border-2 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
        <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
          <p class="text-yellow-600">Color: ${post.color}</p>
          <p class="text-yellow-600">Neighborhood: ${post.neighborhood}</p>
          <p class="text-yellow-600">Height: ${post.itemHeight}</p>
          <p class="text-yellow-600">Length: ${post.itemLength}</p> </div>
          <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
        </div>
          `) 
        }

    let swapsQuery = await fetch(`/.netlify/functions/get_swaps?userEmail=${email}`)
    let swaps = await swapsQuery.json()
    console.log(swaps)
    
    for (let i = 0; i < swaps.length; i++) {
      let swap = swaps[i]

      document.querySelector('.my-swaps').insertAdjacentHTML('beforeend', `
      <div class="swaps-list border-2 m-4 text-gray-600">
            <p class="text-yellow-600">User's Name: ${swap.userName} </p>
            <p class="text-yellow-600">User's Email: ${swap.userEmail} </p>
          </div>
      `)
    }


      
} else {
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    let authUIConfig = {
        signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
    }
    ui.start('.sign-in-or-sign-out', authUIConfig)
}

  }) // end of line 1 function







// SECTION 1
// get posts from firestore
// identify which user is logged in
// filter to get only that user's items
// loop through my items and write to My Items section

// SECTION 2
// get all swaps from firestore
// identify which user is logged in
// filter to show only swap likes for that user
// loop through swap lists and emails
