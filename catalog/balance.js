// Function to set the balance value in local storage
function setBalance() {
  // Get the new balance value from the input field
  var newBalanceValue = document.getElementById('newBalance').value;

  // Update the balance value in the local storage
  localStorage.setItem('balance', newBalanceValue);

  // Update the content of the <p> element with the new balance value
  var balanceElement = document.getElementById('balance');
  balanceElement.textContent = "Balance: " + newBalanceValue;
}

  var balanceValue = localStorage.getItem('balance');
  var balanceElement = document.getElementById('balance');
  if (balanceValue !== null) {
    balanceElement.textContent = "Balance: " + balanceValue;
  }