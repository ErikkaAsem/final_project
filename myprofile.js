firebase.auth().onAuthStateChanged(async function(user) {
let db = firebase.firestore()

if (user) {

    console.log('signed in')

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    

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

    // let swapsQuery = await fetch(`/.netlify/functions/`)
    // console.log(posts.length)

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i]

      document.querySelector('.my-items').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
        <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
          <p class="font-bold text-yellow-600">Color: ${post.color}</p>
          <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
          <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
          <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
          <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
          <a href="#" class="done p-2 text-sm bg-green-800 text-white">❌</a>
        </div>
          `) }

    // let postId = await posts.id
    document.querySelector(`post-${post.id} .done`).addEventListener('click', async function(event) {
        event.preventDefault()
        document.querySelector(`post-${post.id}`).classList.add('opacity-20')
        await db.collection('furniture').doc(post).delete()
        }) 
      
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
