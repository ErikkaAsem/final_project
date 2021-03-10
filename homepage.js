//This will be the landing page where users sign in and see a sample of items exchanges on the site

//What's the diff between get_posts and render post?

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-blue-900 align-right underline sign-out">Sign Out</button>`

      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'homepage.html'
      })
    // Listen for the form submit and create/render the new post UP TO 6
//* HELP * How do I reference a form on a diff HTML page? You can only listen to an event on your page. We can hide the form. document.location.href changes where they're going. This would put the form on its own page.
      document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault()
        let postUsername = user.displayName
        let postImageUrl = document.querySelector('#image-url').value
        let response = await fetch('/.netlify/functions/create_post', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.uid,
            username: postUsername,
            imageUrl: postImageUrl
          })
        })
        let post = await response.json()
        document.querySelector('#image-url').value = '' // clear the image url field
        renderPost(post)
      })
  
      let response = await fetch('/.netlify/functions/get_furniture')
      let posts = await response.json()
      for (let i=0; i<posts.length; i++) {
        let post = posts[i]
        renderPost(post)
      }

    } else {
      // Signed out
      console.log('signed out')
  
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
  //Content  to add
  //Site Name: furniture swap
  //sign-in
  //password
  //create account
  // Welcome to Furniture Swap! The site to trade your furniture and decor 
  //with your Chicago neighbors to keep your home fresh and exciting.
  //Furniture Swap is completely free. Just list the items you want to swap
  // find items you want to have, let your neighbor know you want to make a swap, 
  //and see if they are interested in your items. Once you've agreed to swap, 
  //you will coordinate a convenient meeting spot and time. Voila! You have
  //a great new item in your home. Below are some of the items that have been swapped on Furniture Swap.
  //Insert 8 photos of item photos and make them all the same size and resizeable.
  //https://assets.weimgs.com/weimgs/ab/images/wcm/products/202103/0003/volume-round-drum-coffee-table-wood-c.jpg
  //https://secure.img1-fg.wfcdn.com/im/20325443/compr-r85/7292/72927853/adams-coffee-table-with-storage.jpg
  //http://cdn.shopify.com/s/files/1/2615/3606/products/Nordic-Furniture-Single-Person-Sofa-Simple-Home-Lazy-Sofa-Chair-Leisure-Room-Designer-Fabric-Living-Room.jpg_640x640_481669fc-4620-470f-ad28-c0914b04ce77_1200x1200.jpg?v=1576372439
  //https://images.kirklands.com/is/image/Kirklands/212496_1?$tProduct$
  //https://secure.img1-ag.wfcdn.com/im/55313955/compr-r85/9788/97886485/deveraux-end-table.jpg
  //https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202046/0008/allen-19-tiered-end-table-o.jpg
  //https://i.ebayimg.com/images/g/R4UAAOSwbtVZUKK0/s-l300.jpg
  //https://images.crateandbarrel.com/is/image/Crate/ScribbleCircleRattanWllArtSHF19/$web_pdp_main_carousel_zoom_med$/190422154312/scribble-circle-rattan-wall-art.jpg
  
  