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

const newuser = async (id, password, name, role) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        id,
        password,
        name,
        role,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signup in successfully!");
      window.setTimeout(() => {
        location.assign("/user_list");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.data);
    showAlert("error", err.response.data.error);
  }
};
const userform = document.querySelector(".new-user");
userfrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  newuser(id, password, name, role);
});
