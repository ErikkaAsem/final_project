let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                    
  let allFurnitureData = []                                 
  console.log(event) 
                                       
  let emailFilter = event.queryStringParameters.userEmail
  
  let furnitureQuery
  if (emailFilter) {
    furnitureQuery = await db.collection('furniture')  
                            .where('userEmail', "==", emailFilter)           
                           .get()
    } else {
    furnitureQuery = await db.collection('furniture').get()
      }   
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
  }


  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(allFurnitureData)
  }
}