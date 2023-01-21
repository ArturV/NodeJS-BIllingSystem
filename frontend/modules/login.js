const verifyUserForm = document.body.querySelector("form#loginForm");

const ENDPOINT = "http://localhost:5000/auth/login/";

verifyUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const email = document.querySelector("#emailInput").value.trim();
    const password = document.querySelector("#passwordInput").value;
    const display = document.querySelector("#result");

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const authData = await response.json();

    if (response.ok) {
      document.body.querySelector("#loginForm").reset();

      localStorage.setItem("accessToken", authData.accessToken);
      return window.location.assign(`./groups.html`);
    }

    if (response.status >= 400) {
      display.textContent = "Bad login or password";
      return alert(authData?.error || response.statusText);
    }
  } catch (err) {
    console.log("Wrong name or pass"); //
    display.textContent = "Wrong name or pass";
    console.log(err.message);
  }
});
