/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts.js";

export const login = async (id, password) => {
  try {
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
    console.log(err.response.data.data);
    showAlert("error", err.response.data.data.message);
  }
};
