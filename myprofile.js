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

    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    let querySnapshot = await db.collection('furniture').where('userEmail', '==', email).get()
    console.log(`Number to todos in collection: ${querySnapshot.size}`)

    let items = querySnapshot.docs
    for (let i=0; i<items.length; i++) {
      let itemId = items[i].id
      let item = items[i].data()
      let itemName = item.itemName
      let itemImage = item.imageURL
      let itemNeighborhood = item.neighborhood
      let itemColor = item.color 
      let itemHeight = item.itemHeight
      let itemLength = item.itemLength

      document.querySelector('.my-items').insertAdjacentHTML('beforeend', `
      <div class="flex border-4 p-4 my-4 text-center">
      <div class="w-1/2">
        <h2 class="text-2xl py-1">${itemName}</h2>
          <p class="font-bold text-gray-600">Color: ${itemColor}</p>
          <p class="font-bold text-gray-600">Location: ${itemNeighborhood}</p>
          <p class="font-bold text-gray-600">Height: ${itemHeight}</p>
          <p class="font-bold text-gray-600">Length: ${itemLength}</p> </div>
          <img src='${itemImage}' width="200" height="200" class="w-1/2">
      </div>
        `)


    }  




    // let querySnapshot = await db.collection('furniture').where('email', '==', email).get()
    // console.log(querySnapshot)
    // let items = querySnapshot.docs
    // for (let i = 0; i < items.length; i++) {
    //     let itemId = items[i].id
    //     let itemData = items[i].data()
    //     let itemName = itemData.itemName
    //     let itemImageUrl = itemData.imageUrl

    //     console.log(itemId)
    //     console.log(itemData)
    //     console.log(itemName)
    //     console.log(itemImageUrl)
    
    //     renderItem(itemId, itemData, itemName, itemImageUrl)
    // }

    // function renderFurniture(furnitureArray) {
    //     for (let i = 0; i < furnitureArray.length; i++) {
    //       let furniture = furnitureArray[i]    


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
