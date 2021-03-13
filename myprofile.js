firebase.auth().onAuthStateChanged(async function(user) {
let db = firebase.firestore()

if (user) {

    console.log('signed in')
    let username = user.displayName
    let email = user.email
    let uid = user.uid
    // console.log(username)
    // console.log(email)
    // console.log(uid)


    let querySnapshot = await db.collection('furniture').where('email', '==', email).get()
    console.log(querySnapshot)
    let items = querySnapshot.docs
    for (let i = 0; i < items.length; i++) {
        let itemId = items[i].id
        let itemData = items[i].data()
        let itemName = itemData.itemName
        let itemImageUrl = itemData.imageUrl

        console.log(itemId)
        console.log(itemData)
        console.log(itemName)
        console.log(itemImageUrl)
    
        renderItem(itemId, itemData, itemName, itemImageUrl)
    }

    function renderFurniture(furnitureArray) {
        for (let i = 0; i < furnitureArray.length; i++) {
          let furniture = furnitureArray[i]
    

    document.querySelector('my-items').insertAdjacentHTML('beforeend', `
    <div class="border-4 p-4 my-4 text-left">
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
