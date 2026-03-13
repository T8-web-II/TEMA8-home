function togglePassword() {
  const password = document.getElementById("password");
  const icon = document.getElementById("toggleIcon");

  if (password.type === "password") {
    password.type = "text";
    icon.src = "images/eye-off.svg";
  } else {
    password.type = "password";
    icon.src = "images/eye.svg";
  }
}
