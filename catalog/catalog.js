var images = ['2.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg',
                'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg', 'image16.jpg'];

function setImages() {
  var slots = document.querySelectorAll('.slot');
  slots.forEach(function(slot, index) {
    var img = new Image(); // Create a new Image element
    img.classList.add('item-img'); // Add the item-img class to the image
    img.src = 'img/' + images[index]; // Set the image source
    img.alt = 'Image ' + (index + 1); // Set alt attribute
    slot.appendChild(img); // Append the image to the slot
    slot.querySelector('.overlay').setAttribute('onclick', 'showItemInfo("Item ' + (index + 1) + '")'); // Set onclick attribute for overlay
  });
}

window.onload = setImages;

function showItemInfo(itemName) {
  var modal = document.getElementById("myModal");
  var itemInfoContainer = document.getElementById("item-info");

  // Fetch XML data
  fetch('example_data.xml')
    .then(response => response.text())
    .then(data => {
      // Parse XML
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, 'text/xml');
      
      // Find item node with corresponding name
      var itemNode = xmlDoc.querySelector('item[name="' + itemName + '"]');
      if (itemNode) {
        var itemDescription = itemNode.querySelector('description').textContent;
        var itemPrice = itemNode.querySelector('price').textContent;

        // Update modal content with item information
        itemInfoContainer.innerHTML = "<h2>" + itemName + "</h2><p>Description: " + itemDescription + "</p><p>Price: " + itemPrice + "</p>";
      } else {
        itemInfoContainer.innerHTML = "<h2>Item not found</h2>";
      }

      modal.style.display = "block";
    })
    .catch(error => {
      console.error('Error fetching XML:', error);
      itemInfoContainer.innerHTML = "<h2>Error fetching item information</h2>";
      modal.style.display = "block";
    });
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
