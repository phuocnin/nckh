import axios from "axios";
import { showAlert } from "./alerts.js";

export const delete_notify = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/notifys/${id}`,
    });

    if (res.data.status === "success") {
      showAlert("success", "Notify in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.data);
    showAlert("error", err.response.data.error);
  }
};
