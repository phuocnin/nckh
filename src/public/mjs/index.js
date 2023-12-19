/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login.js";
import { showAlert } from "./alerts.js";
import { newuser } from "./new_user.js";
import { newtopic } from "./project.js";
import { changePass } from "./changePass.js";
import { new_notify } from "./new_notify.js";
import { fixuser } from "./fixuser.js";

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const userfrom = document.querySelector(".new-user");
const projectform = document.querySelector(".newtopic");
const changepass = document.querySelector(".change_pass");
const new_notifyform = document.querySelector(".notify");
const delete_notify = document.querySelector(".delete_notify");
if (delete_notify) {
  new_notifyform.addEventListener("submit", (e) => {
    console.log("a");
    e.preventDefault();
    const ThongBao = document.getElementById("data-id").value;

    new_notify(ThongBao, NoiDung);
  });
}
if (new_notifyform) {
  new_notifyform.addEventListener("submit", (e) => {
    e.preventDefault();
    const ThongBao = document.getElementById("thongbao").value;
    const NoiDung = document.getElementById("noidung").value;
    new_notify(ThongBao, NoiDung);
  });
}
if (userfrom) {
  userfrom.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    newuser(id, password, name, role);
  });
}
if (changepass) {
  console.log("a");
  changepass.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("oldpassword").value;
    const newPassword = document.getElementById("password").value;
    changePass(password, newPassword);
  });
}
if (fixuser) {
  console.log("a");
  fixuser.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("ten").value;
    const email = document.getElementById("email").value;
    const gioitinh = document.getElementById("gioitinh").value;
    const sdt = document.getElementById("sodienthoai").value;
    const khoa = document.getElementById("khoa").value;
    changePass(name, email, gioitinh, sdt, khoa);
  });
}
if (projectform) {
  projectform.addEventListener("submit", (e) => {
    e.preventDefault();
    const Tendetai = document.getElementById("tendetai").value;
    const NgayThucHien = document.getElementById("ngaybatdau").value;
    const NgayKetThuc = document.getElementById("ngayketthuc").value;
    const MaNganh = document.getElementById("MaNganh").value;
    const ThanhvienElement = document.getElementById("thanhvien");
    const Thanhvien = Array.from(ThanhvienElement.selectedOptions).map(
      (option) => option.value
    );

    console.log(Thanhvien);
    const MoTa = document.getElementById("mota").value;

    newtopic(Tendetai, MaNganh, NgayThucHien, NgayKetThuc, MoTa, Thanhvien);
  });
}

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;
    login(id, password);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

const alertMessage = document.querySelector("body").dataset.alert;
if (alertMessage) showAlert("success", alertMessage, 20);
