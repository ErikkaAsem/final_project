let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let postId = body.postId
  let userId = body.userId
  let userName = body.username
  let userEmail = body.email
  
  console.log(`post: ${postId}`)
  console.log(`user: ${userId}`)


  let querySnapshot = await db.collection('swap')
                              .where('postId', '==', postId)
                              .where('userId', '==', userId)
                              .get()
  let numberOfSwaps = querySnapshot.size

  if (numberOfSwaps == 0) {
    let swap = await db.collection('swap').add({
      postId: postId,
      userId: userId,
      email: userEmail,
      username: userName,
      // itemName: itemName
    })
    return { 
        statusCode: 200,  
        body: JSON.stringify(swap)
    }
  } else {
    return { statusCode: 403 }
  }

}

