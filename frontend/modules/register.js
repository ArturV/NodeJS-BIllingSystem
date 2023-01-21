const addUserForm = document.body.querySelector("form#registerForm");
const ENDPOINT = "http://localhost:5000/auth/register/";

addUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const display = document.querySelector("#result");
  const getCleanName = document.querySelector("#nameInput").value;
  const getCleanEmail = document.querySelector("#emailInput").value.trim();
  const getPassword = document.querySelector("#passwordInput").value;
  const getCheckedPassword = document.querySelector(
    "#checkedPasswordInput"
  ).value;

  if (getPassword != getCheckedPassword) {
    return (display.textContent =
      "Password & Repeat Password must be the same");
  } else {
    display.textContent = "";
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          name: getCleanName,
          email: getCleanEmail,
          password: getPassword,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        document.body.querySelector("#registerForm").reset();
        alert("User was created");
        display.textContent = "User was created";
        return window.location.assign(`./login.html`);
      }
    } catch (error) {
      display.textContent = "Server does not response / failed to fetch";
      console.error(error);
    }
  }
});
