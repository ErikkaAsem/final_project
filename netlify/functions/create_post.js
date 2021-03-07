// /.netlify/functions/create_post
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let color = body.color
  let imageURL = body.imageURL
  let itemHeight = body.itemHeight
  let itemLength = body.itemLength
  let itemName = body.itemName
  let itemWidth = body.itemWidth
  let neighborhood = body.neighborhood
       // username: username
  
  // console.log(`user: ${userId}`)
  // console.log(`imageUrl: ${imageUrl}`)

  let newPost = { 
    color: color, 
    imageURL: imageURL, 
    itemHeight: itemHeight, 
    itemLength: itemLength, 
    itemName: itemName, 
    itemWidth: itemWidth, 
    neighborhood: neighborhood, 
        // username: username, 
    created: firebase.firestore.FieldValue.serverTimestamp()
  }

  let docRef = await db.collection('furniture').add(newPost)
  newPost.id = docRef.id
  newPost.likes = 0

  return {
    statusCode: 200,
    body: JSON.stringify(newPost)
  }

}