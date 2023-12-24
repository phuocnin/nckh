import axios from "axios";
import { showAlert } from "./alerts.js";

export const newuser = async (name,chutich,thuky,uyvien1,uyvien2) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users",
      data: {
      name,
      chutich,
      thuky,
      uyvien1,
      uyvien2,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signup in successfully!");
      window.setTimeout(() => {
        location.assign("/userlist");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.data);
    showAlert("error", err.response.data.error);
  }
};
