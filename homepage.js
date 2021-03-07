//This will be the landing page where users sign in and see a sample of items exchanges on the site


firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
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
  
  