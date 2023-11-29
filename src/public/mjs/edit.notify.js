// Khi người dùng chọn chỉnh sửa thông báo
function editNotify(notifyId) {
  // Gửi yêu cầu GET để lấy dữ liệu thông báo hiện tại
  axios
    .get(`/api/v1/notifys/${notifyId}`)
    .then((response) => {
      const notifyData = response.data.data;
      // Hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
      showEditForm(notifyData);
    })
    .catch((error) => {
      console.error("Error fetching notify data:", error);
    });
}

// Hàm hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
function showEditForm(notifyData) {
  const editThongbaoInput = document.getElementById("editThongbao");
  const editNoidungTextarea = document.getElementById("editNoidung");

  // Điền dữ liệu vào biểu mẫu chỉnh sửa
  editThongbaoInput.value = notifyData.ThongBao;
  editNoidungTextarea.value = notifyData.NoiDung;

  // Hiển thị modal chỉnh sửa
  const editModal = document.getElementById("editModal");
  editModal.style.display = "block";
}

// Hàm đóng modal chỉnh sửa
function closeEditModal() {
  const editModal = document.getElementById("editModal");
  editModal.style.display = "none";
  location.reload();
}

// Hàm lưu thông báo chỉnh sửa
function saveEditForm(notifyId) {
  const editThongbaoInput = document.getElementById("editThongbao");
  const editNoidungTextarea = document.getElementById("editNoidung");

  const editedData = {
    ThongBao: editThongbaoInput.value,
    NoiDung: editNoidungTextarea.value,
  };

  // Gửi yêu cầu PUT/PATCH để cập nhật thông báo
  axios
    .patch(`/api/v1/notifys/${notifyId}`, editedData)
    .then((response) => {
      console.log("Notify updated successfully", response.data);

      // Đóng modal và có thể cập nhật lại giao diện hoặc tải lại trang
      closeEditModal();
    })
    .catch((error) => {
      console.error("Error updating notify:", error);
    });
}
