
function colorFilter(post) {
    let colorFilter
    if (post.color == 'gold') {
        colorFilter = 'Gold'
    } else if (post.color == 'green') {
        colorFilter = 'Green'
    } else if (post.color == 'white') {
        colorFilter = 'White'
    } else if (post.color == 'silver') {
        colorFilter = 'Silver'
    } else if (post.color == 'off-white') {
        colorFilter = 'Off-White'
    } else if (post.color == 'black') {
        colorFilter = 'Black'
    } else if (post.color == 'grey') {
        colorFilter = 'Grey'
    } else if (post.color == 'blue') {
        colorFilter = 'Blue'
    } else if (post.color == 'brown') {
        colorFilter = 'Brown'
    } else {
        colorFilter = 'Multi'
    }
    return colorFilter
}

function renderItems(itemsArray) {
    for (let i = 0; i < itemsArray.length; i++) {
        let item = itemsArray[i]
    }
}

firebase.auth().onAuthStateChanged(async function (user) {

    let db = firebase.firestore()
    let response = await fetch('/.netlify/functions/get_furniture')
    let json = await response.json()

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <button class="font-bold text-xs text-yellow-900 text-center sign-out">Sign Out</button>
  `
    console.log(json)

    if (user) {
        console.log('signed in')

        // loop through json
        for (let i = 0; i < json.length; i++) {
            let post = json[i]
            console.log(post)

            document.querySelector('.posts').insertAdjacentHTML('beforeend', `
            <div class="flex border-4 p-4 my-4 text-center">
            <div class="w-1/3 post-${post.id}">
      <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
        <p class="font-bold text-yellow-600">Color: ${post.color}</p>
        <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
        <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
        <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
        <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
        <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
    </div>
        `)
        }
        for (let i = 0; i < json.length; i++) {
            let post = json[i]
            let itemId = post.itemName
            let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)

            swapButton.addEventListener('click', async function (event) {
                event.preventDefault()
                console.log(`post ${itemId} swap button clicked`)


                let swapResponse = await fetch('/.netlify/functions/swap', {
                    method: 'POST',
                    body: JSON.stringify({
                        postId: post.id,
                        userId: user.uid
                    })
                })
                if (swapResponse.ok) {
                    let swapElement = document.querySelector(`.post-${post.id}`)
                    swapElement.classList.add('opacity-20')
                }


            })
        }

        //if statement for color for above loop
        document.querySelector(`#white-filter`).addEventListener('click', async function (event) {
            console.log('white was clicked')
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'White') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'White') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        //NEED HELP WITH ABOVE
        document.querySelector(`#green-filter`).addEventListener('click', async function (event) {
            console.log('green was clicked')
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Green') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Green') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#silver-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Silver') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Silver') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#brown-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Brown') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Brown') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#black-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Black') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Black') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#multi-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Multi') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Multi') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#off-white-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.color}` == 'Multi') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.color}` == 'Multi') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#south-loop-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
           
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.neighborhood}` == 'South Loop') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.neighborhood}` == 'South Loop') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#lincoln-park-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.neighborhood}` == 'Lincoln Park') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.neighborhood}` == 'Lincoln Park') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#bucktown-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.neighborhood}` == 'Bucktown') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.neighborhood}` == 'Bucktown') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )
        document.querySelector(`#the-loop-filter`).addEventListener('click', async function (event) {
            event.preventDefault()
            //NEED HELP WITH BELOW
            // create a new empty array
            document.querySelector('.posts').innerHTML = ''
            let itemArray = []
            // loop through the rides and for each ride, use the provided levelOfService() function to determine the service level, and use newArray.push(ride) to add "Noober Purple" rides into the new array
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                console.log(post)
        if (`${post.neighborhood}` == 'The Loop') {

                document.querySelector('.posts').insertAdjacentHTML('beforeend', `
        <div class="flex border-4 p-4 my-4 text-center">
        <div class="w-1/2 post-${post.id}">
          <h2 class="text-2xl py-1 font-bold text-green-700 text-xl">${post.itemName}</h2>
            <p class="font-bold text-yellow-600">Color: ${post.color}</p>
            <p class="font-bold text-yellow-600">Neighborhood: ${post.neighborhood}</p>
            <p class="font-bold text-yellow-600">Height: ${post.itemHeight}</p>
            <p class="font-bold text-yellow-600">Length: ${post.itemLength}</p> </div>
            <img src='${post.imageURL}' width="200" height="200" class="w-1/2">
            <a href="#" class="swap-button-${post.id} block text-center text-white bg-green-700 hover:bg-green-900 mt-4 px-4 py-2 rounded">Let's swap!</a>
        </div>
            `)
            }
        }
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                let itemId = post.itemName
                let swapButton = document.querySelector(`.posts .swap-button-${post.id}`)
                if (`${post.neighborhood}` == 'The Loop') {

                swapButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    console.log(`post ${itemId} swap button clicked`)
    
    
                    let swapResponse = await fetch('/.netlify/functions/swap', {
                        method: 'POST',
                        body: JSON.stringify({
                            postId: post.id,
                            userId: user.uid
                        })
                    })
                    if (swapResponse.ok) {
                        let swapElement = document.querySelector(`.post-${post.id}`)
                        swapElement.classList.add('opacity-20')
                    }
    
    
                })
            }
        }
          //  
        }
        )

        //insertadjacent
        //shift option 
    } else {

        // Hide the form when signed-out
        document.querySelector('.posts').classList.add('hidden')
        // Initializes FirebaseUI Auth
        let ui = new firebaseui.auth.AuthUI(firebase.auth())
        // FirebaseUI configuration
        let authUIConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: 'index.html'
        }
        // Starts FirebaseUI Auth
        ui.start('.sign-in-or-sign-out', authUIConfig)
    }
})

// changed "movies" to "posts"
  // Goal:   Refactor the movies application from last week, so that it supports
  //         user login and each user can have their own watchlist.

  // Start:  Your starting point is one possible solution for last week's homework.

  // Step 1: Add your Firebase configuration to movies.html, along with the
  //         (provided) script tags for all necessary Firebase services – i.e. Firebase
  //         Auth, Firebase Cloud Firestore, and Firebase UI for Auth; also
  //         add the CSS file for FirebaseUI for Auth.
  // Step 2: Change the main event listener from DOMContentLoaded to 
  //         firebase.auth().onAuthStateChanged and include conditional logic 
  //         shows a login UI when signed, and the list of movies when signed
  //         in. Use the provided .sign-in-or-sign-out element to show the
  //         login UI. If a user is signed-in, display a message like "Signed 
  //         in as <name>" along with a link to "Sign out". Ensure that a document
  //         is set in the "users" collection for each user that signs in to 
  //         your application.
  // Step 3: Setting the TMDB movie ID as the document ID on your "watched" collection
  //         will no longer work. The document ID should now be a combination of the
  //         TMDB movie ID and the user ID indicating which user has watched. 
  //         This "composite" ID could simply be `${movieId}-${userId}`. This should 
  //         be set when the "I've watched" button on each movie is clicked. Likewise, 
  //         when the list of movies loads and is shown on the page, only the movies 
  //         watched by the currently logged-in user should be opaque.