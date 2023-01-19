const verifyUserForm = document.body.querySelector("form#loginForm");

const ENDPOINT = "http://localhost:5000/auth/login/";

verifyUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const email = document.querySelector("#emailInput").value.trim();
    const password = document.querySelector("#passwordInput").value;
    const display = document.querySelector("#result");

    console.log(email, password); //
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.body.querySelector("#loginForm").reset();
      display.textContent = "You are logged in";
    }
  } catch (err) {
    console.log("Wrong name or pass"); //
    display.textContent = "Wrong name or pass";
    console.log(err.message);
  }
});
v;
