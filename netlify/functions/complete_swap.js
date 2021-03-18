// API url to this lambda funtion: /.netlify/functions/complete_todo
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

  let body = JSON.parse(event.body)
  let postId = body.postId

  await db.collection('furniture').doc(postId).delete()
  console.log(`deleted todo with ID ${postId}`)

  return {
    statusCode: 200,
    body: JSON.stringify({success: true})
  }
}
