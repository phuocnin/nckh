import axios from "axios";
import { showAlert } from "./alerts.js";
export const newtopic = async (
  TenDeTai,
  MaNganh,
  NgayThucHien,
  NgayKetThuc,
  MoTa,
  ThanhVien
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/topics",
      data: {
        TenDeTai,
        MaNganh,
        NgayThucHien,
        NgayKetThuc,
        MoTa,
        ThanhVien,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signup in successfully!");
      window.setTimeout(() => {
        location.assign("/topics");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.data);
    showAlert("error", err.response.data.error);
  }
};
