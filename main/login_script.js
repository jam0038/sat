
function validateLogin() {
    var username = document.getElementById("username").value; // Get the value of the username input field // Made by Mohammad
    var password = document.getElementById("password").value; // Get the value of the password input field // Made by Mohammad
    var extraFrame = document.getElementById("extra-frame"); // Get the extra frame for displaying messages // Made by Mohammad
    var message = ""; // Initialize the message variable // Made by Mohammad
  
    if (username === "admin" && password === "2011") { // Check if username and password match // Made by Mohammad
      // Redirect to another page // Made by Mohammad
      window.location.href = "/catalog/index.html"; // Made by Mohammad
    } else {
      message = "Wrong username or password. Please try again."; // Set error message if username or password is incorrect // Made by Mohammad
    }
  
    // Append new message to the extra frame // Made by Mohammad
    extraFrame.innerHTML += "<p>" + message + "</p>"; // Made by Mohammad
  
    // Remove the oldest message after 3 seconds // Made by Mohammad
    var messages = extraFrame.getElementsByTagName("p"); // Get all paragraph elements within the extra frame // Made by Mohammad
    if (messages.length > 0) { // Check if there are any messages // Made by Mohammad
      setTimeout(function(){
        extraFrame.removeChild(messages[0]); // Remove the oldest message after 3 seconds // Made by Mohammad
      }, 3000);
    }
  
    // Return false to prevent form submission // Made by Mohammad
    return false; // Made by Mohammad
  }
  