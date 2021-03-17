let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()                             
    let allSwaps = []

    let swapsQuery = await db.collection('swap')             
                           .orderBy('created')              
                           .get()
    let swaps = await swapsQuery.docs

    for (let i=0; i<swaps.length; i++) {
        let swapId = swaps[i].id
        let userId = swaps[i].userId
    }
 

    }
}

// get the furniture, filtered by the email
// filter by the post ID in a swaps function
// show the username and email from the swap
// check out comments on Kelloggram