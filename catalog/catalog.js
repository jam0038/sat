var images = ['image (1).jpg', 'image (2).jpg', 'image (3).jpg', 'image (4).jpg', 'image (5).jpg', 'image (6).jpg', 'image (7).jpg', 'image (8).jpg', 'image (9).jpg', 'image (10).jpg',
'image (11).jpg', 'image (12).jpg', 'image (13).jpg', 'image (14).jpg', 'image (15).jpg', 'image (16).jpg'];



  var slots = document.querySelectorAll('.slot');
  slots.forEach(function(slot, index) {
    var img = new Image(); // Create a new Image element
    img.classList.add('item-img'); // Add the item-img class to the image
    img.src = 'img/' + images[index]; // Set the image source
    img.alt = 'Image ' + (index + 1); // Set alt attribute
    slot.appendChild(img); // Append the image to the slot
    slot.querySelector('.overlay').setAttribute('onclick', 'showItemInfo("Item ' + (index + 1) + '")'); // Set onclick attribute for overlay
  });

  let cart_loc = localStorage.getItem('cart')
  if (cart_loc != null) {
    console.log(cart_loc);
  }
  else {
    save_cart([])
  }  

  function get_cart() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  function save_cart(c) {
    const json = JSON.stringify(c)
    localStorage.setItem('cart', json)
  }

  function add_cart(i) {
    c = get_cart()
    c.push(i)
    save_cart(c)
  } 

const cart_btn = document.getElementById('click_cart')
cart_btn.onclick = showCart

function showCart() {
  var modal = document.getElementById("myModal");
  var itemInfoContainer = document.getElementById("item-info");


}

var xmlData = []
function parseXML() {
  
  fetch('example_data.xml').then(response => response.text()).then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'text/xml');
    
    let _data = xmlDoc.querySelector('catalog').childNodes
    
    _data = [..._data].filter(n => n.hasChildNodes());
    
    xmlData = _data.map(i => {
      return {
        name: i.getAttribute('name'),
        price: i.children[1].innerHTML,
        description: i.children[0].innerHTML,
      }
    })
  })
}
parseXML()


function showItemInfo(itemName) {
  var modal = document.getElementById("myModal");
  var itemInfoContainer = document.getElementById("item-info");

  let item = xmlData.find(n => n.name == itemName)

  if (!item) {
    console.error('Error fetching XML:', error);
    itemInfoContainer.innerHTML = "<h2>Error fetching item information</h2>";
    modal.style.display = "block";

    return
  }

  // Update modal content with item information
  itemInfoContainer.innerHTML = "<h2>" + item.name + "</h2><p>Description: " + item.description + "</p><p>Price: $" + item.price + "</p>";
  var btn = document.createElement('button')
  btn.innerHTML = "Buy"
  var bal = parseFloat(localStorage.getItem('balance'))
  if (bal < item.price) btn.disabled = true
  btn.addEventListener("click", () => {
    if (bal < item.price) {
      btn.disabled = true
      return
    }
    bal -= item.price
    localStorage.setItem('balance', bal)
    var balanceElement = document.getElementById('balance');
    balanceElement.textContent = "Balance: " + bal;

    add_cart(item.name)
    

    if (bal < item.price || bal < 0) {
      bal = 0;

      btn.disabled = true
      return
    }
  })
  itemInfoContainer.appendChild(btn)

  modal.style.display = "block";

  // // Fetch XML data
  // fetch('example_data.xml')
  //   .then(response => response.text())
  //   .then(data => {
  //     // Parse XML
  //     var parser = new DOMParser();
  //     var xmlDoc = parser.parseFromString(data, 'text/xml');

  //     // Find item node with corresponding name
  //     var itemNode = xmlDoc.querySelector('item[name="' + itemName + '"]');
  //     if (itemNode) {
 
  //     } else {
  //       itemInfoContainer.innerHTML = "<h2>Item not found</h2>";
  //     }

  //     modal.style.display = "block";
  //   })
  //   .catch(error => {

  //   });
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
