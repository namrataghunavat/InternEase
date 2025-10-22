document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("secret").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const email_id = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(email_id);

    fetch("http://localhost:3000/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_id, password }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
});
