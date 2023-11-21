const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const login = async (id, password) => {
  try {
    console.log(id, password);
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        id,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
const loginForm = document.querySelector(".form--login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  login(id, password);
});

// exports.logout = async () => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "/api/v1/users/logout",
//     });
//     if ((res.data.status = "success")) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert("error", "Error logging out! Try again.");
//   }
// };
