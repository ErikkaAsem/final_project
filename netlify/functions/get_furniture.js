//ref get to dos final 

// /.netlify/functions/get_posts
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                             // define a variable so we can use Firestore
  let allFurnitureData = []                                        // an empty Array
  
  let furnitureQuery = await db.collection('furniture')             // posts from Firestore
                           .orderBy('created')              // ordered by created
                           .get()
  let furniture = furnitureQuery.docs                               // the post documents themselves
  
  // loop through the post documents
  for (let i=0; i<furniture.length; i++) {
    let furnitureId = furniture[i].id                                // the ID for the given post
    let furnitureData = furniture[i].data()                          // the rest of the post data
  
  
    
    // add a new Object of our own creation to the postsData Array
    allFurnitureData.push({
      id: furnitureId,                                           // the post ID
      imageURL: furnitureData.imageURL,  
      userEmail: furnitureData.userEmail,                        // the image URL
      userName: furnitureData.userName,  
      color: furnitureData.color, 
      imageURL: furnitureData.imageURL, 
      itemHeight: furnitureData.itemHeight, 
      itemLength: furnitureData.itemLength, 
      itemName: furnitureData.itemName, 
      itemWidth: furnitureData.itemWidth, 
      neighborhood: furnitureData.neighborhood,                        // the username
                                  // an Array of comments
    })
  }


  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(allFurnitureData)
  }
}