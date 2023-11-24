
import axios from "axios";
import { showAlert } from "./alerts.js";
export const newtopic = async (TenDeTai,MaNganh,NgayThucHien,NgayKetThuc,MoTa) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/topics",
      data: {
       TenDeTai,
       MaNganh,
       NgayThucHien,
       NgayKetThuc,
       MoTa
      
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


