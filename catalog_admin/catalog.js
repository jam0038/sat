// Array of image filenames for the items. Made by Mohammad
var images = [
  "image (1).jpg",
  "image (2).jpg",
  "image (3).jpg",
  "image (4).jpg",
  "image (5).jpg",
  "image (6).jpg",
  "image (7).jpg",
  "image (8).jpg",
  "image (9).jpg",
  "image (10).jpg",
  "image (11).jpg",
  "image (12).jpg",
  "image (13).jpg",
  "image (14).jpg",
  "image (15).jpg",
  "image (16).jpg",
];

// Maps the image filenames to an object with src and alt properties. Made by Mohammad
const img_data = images.map((img, i) => {
  return {
      src: "img/" + img,
      alt: "Image " + (i + 1),
  };
});

// Selects all elements with the class 'slot' and populates them with images. Made by Mohammad
var slots = document.querySelectorAll(".slot");
slots.forEach(function (slot, index) {
  if (!img_data[index]) return;
  var img = new Image();
  img.classList.add("item-img");
  const { src, alt } = img_data[index];
  img.src = src;
  img.alt = alt;
  slot.appendChild(img);
  // Optional code to set an onclick event on an overlay (currently commented out). Made by Mohammad
  // slot.querySelector(".overlay").setAttribute(
  //     "onclick",
  //     "showItemInfo('Item " + (index + 1) + "')"
  // );
});

// Retrieves the cart from localStorage or initializes an empty cart. Made by Mohammad
let cart_loc = localStorage.getItem("cart");
if (cart_loc != null) {
  console.log(cart_loc);
} else {
  save_cart([]);
}

// Gets the cart data from localStorage. Made by Mohammad
function get_cart() {
  return JSON.parse(localStorage.getItem("cart"));
}

// Saves the cart data to localStorage. Made by Mohammad
function save_cart(c) {
  const json = JSON.stringify(c);
  localStorage.setItem("cart", json);
}

// Adds an item to the cart and saves it to localStorage. Made by Mohammad
function add_item_cart(i) {
  const c = get_cart();
  c.push(i);
  save_cart(c);
}

// Retrieves item data based on the name from the XML data. Made by Mohammad
function get_item_data(name) {
  return xmlData.find((i) => i.name == name);
}

// Retrieves all items currently in the cart and returns their data. Made by Mohammad
function get_items_cart() {
  const c = get_cart();
  const items = c.map((i) => get_item_data(i));
  return items;
}

// Sets up the click event for the cart button to show the cart. Made by Mohammad
const cart_btn = document.getElementById("click_cart");
cart_btn.onclick = showCart;

// Displays the contents of the cart in a modal. Made by Mohammad
function showCart() {
  var modal = document.getElementById("myModal");
  var container = document.getElementById("item-info");

  container.innerHTML = "";

  const items_con = document.createElement("div");
  container.appendChild(items_con);

  const items = get_items_cart();

  let p_itms = [];
  items.forEach((i) => {
      if (p_itms.includes(i)) return;
      const slot = document.createElement("p");
      slot.id = "cart-" + i.name;

      const amt = items.filter((_i) => _i.name == i.name).length;

      slot.innerText =
          i.name + " - $" + i.price + (amt > 0 ? ` (${amt}x)` : "");

      items_con.appendChild(slot);

      p_itms.push(i);
  });

  container.appendChild(document.createElement("hr"));

  const total = items
      .map((i) => parseFloat(i.price))
      .reduce((a, b) => a + b, 0);

  const tot_p = document.createElement("h3");
  tot_p.innerText = `Total: $${total}`;

  container.appendChild(tot_p);

  modal.style.display = "block";
}

// Initializes an empty array to store XML data. Made by Mohammad
var xmlData = [];
// Fetches and parses the XML data, then maps it to the xmlData array. Made by Mohammad
function parseXML() {
  fetch("example_data.xml")
      .then((response) => response.text())
      .then((data) => {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(data, "text/xml");

          let _data = xmlDoc.querySelector("catalog").childNodes;

          _data = [..._data].filter((n) => n.hasChildNodes());

          xmlData = _data.map((i) => {
              const name = i.getAttribute("name");

              const id = name.split(" ")[1];

              return {
                  name,
                  price: i.children[1].innerHTML,
                  description: i.children[0].innerHTML,
                  image: img_data.find(
                      (d) => d.src == `img/image (${id}).jpg`
                  ),
              };
          });
      });
}
parseXML();

// Displays detailed information about a specific item in a modal. Made by Mohammad
function showItemInfo(itemName) {
  var modal = document.getElementById("myModal");
  var itemInfoContainer = document.getElementById("item-info");

  let item = xmlData.find((n) => n.name == itemName);

  if (!item) {
      console.error("Error fetching XML:", error);
      itemInfoContainer.innerHTML =
          "<h2>Error fetching item information</h2>";
      modal.style.display = "block";

      return;
  }

  itemInfoContainer.innerHTML =
      "<h2>" +
      item.name +
      "</h2><p>Description: " +
      item.description +
      "</p><p>Price: $" +
      item.price +
      "</p><img src='" +
      item.image +
      "'></img>";
  var btn = document.createElement("button");
  btn.innerHTML = "Buy";
  var bal = parseFloat(localStorage.getItem("balance"));
  if (bal < item.price) btn.disabled = true;
  btn.addEventListener("click", () => {
      if (bal < item.price) {
          btn.disabled = true;
          return;
      }
      bal -= item.price;
      localStorage.setItem("balance", bal);
      var balanceElement = document.getElementById("balance");
      balanceElement.textContent = "Balance: " + bal;

      add_item_cart(item.name);

      if (bal < item.price || bal < 0) {
          bal = 0;

          btn.disabled = true;
          return;
      }
  });
  itemInfoContainer.appendChild(btn);

  modal.style.display = "block";
}

// Closes the modal when called. Made by Mohammad
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Closes the modal when clicking outside of it. Made by Mohammad
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
};
