let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()                             

let allFurnitureData = []
let allSwapsData = []                                 
                                        
let emailFilter = event.queryStringParameters.userEmail

let furnitureQuery = await db.collection('furniture')  
                            .where('userEmail', "==", emailFilter)           
                            .get()
let furniture = furnitureQuery.docs                          

for (let i=0; i<furniture.length; i++) {
    let furnitureId = furniture[i].id                                
    let furnitureData = furniture[i].data()                          

    allFurnitureData.push({
    id: furnitureId,                                           
    imageURL: furnitureData.imageURL,  
    userEmail: furnitureData.userEmail,                        
    userName: furnitureData.userName,  
    color: furnitureData.color, 
    imageURL: furnitureData.imageURL, 
    itemHeight: furnitureData.itemHeight, 
    itemLength: furnitureData.itemLength, 
    itemName: furnitureData.itemName, 
    itemWidth: furnitureData.itemWidth, 
    neighborhood: furnitureData.neighborhood,                        
    })

let swapsQuery = await db.collection('swap')
                         .where('postId', '==', furnitureId)
                         .get()
let swaps = await swapsQuery.docs

for (let i = 0; i < swaps.length; i++) {
    let swapsData = swaps[i].data()

    allSwapsData.push({
        postId: swapsData.postId,
        userName: swapsData.username,
        userEmail: swapsData.email,
        userId: swapsData.userId,
        // itemName: swapsData.itemName
    })

    }

    return {
        statusCode: 200,
        body: JSON.stringify(allSwapsData) }

} }