const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/groups", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(data.error);
      return window.location.assign(`./login.html`);
    }

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
