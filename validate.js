document.getElementById("registrationForm").addEventListener("submit", function (event) {
  let valid = true;
  let messages = [];

  let fullName = document.getElementById("fullName").value.trim();
  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    valid = false;
    messages.push("Full Name should contain only letters and spaces.");
  }

  let email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    valid = false;
    messages.push("Enter a valid Email.");
  }

  let dob = document.getElementById("dob").value;
  if (!dob) {
    valid = false;
    messages.push("Date of Birth is required.");
  }

  let gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    valid = false;
    messages.push("Select your Gender.");
  }

  let phone = document.getElementById("phone").value.trim();
  if (!/^\d{10}$/.test(phone)) {
    valid = false;
    messages.push("Phone Number must be 10 digits.");
  }

  let course = document.getElementById("course").value;
  if (course === "") {
    valid = false;
    messages.push("Select a Course.");
  }

  let skills = document.querySelectorAll('input[name="skills"]:checked');
  if (skills.length === 0) {
    valid = false;
    messages.push("Select at least one Skill.");
  }

  let address = document.getElementById("address").value.trim();
  if (address === "") {
    valid = false;
    messages.push("Address cannot be empty.");
  }

  let agree = document.querySelector('input[name="agree"]:checked');
  if (!agree) {
    valid = false;
    messages.push("You must agree to the terms.");
  }

  if (!valid) {
    event.preventDefault();
    alert(messages.join("\n"));
  }
});
