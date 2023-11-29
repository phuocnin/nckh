// Khi người dùng chọn chỉnh sửa thông báo
function editUser(userId) {
  // Gửi yêu cầu GET để lấy dữ liệu thông báo hiện tại
  axios
    .get(`/api/v1/users/${userId}`)
    .then((response) => {
      const userData = response.data.data;
      // Hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
      showEditForm(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

// Hàm hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
function showEditForm(userData) {
  const editThongbaoInput = document.getElementById("editThongbao");
  const editNoidungTextarea = document.getElementById("editNoidung");
  const editName = document.getElementById("editName");
  const editEmail = document.getElementById("editEmail");
  const editSdt = document.getElementById("editSdt");
  const editGioiTinh = document.getElementById("editGioiTinh");
  const editKhoa = document.getElementById("editKhoa");
  // Điền dữ liệu vào biểu mẫu chỉnh sửa
  editName.value = userData.name;
  editEmail.value = userData.email;
  editSdt.value = userData.sdt;
  editGioiTinh.value = userData.gioitinh;
  editKhoa.value = userData.khoa;

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
function saveEditForm(userId) {
  const editName = document.getElementById("editName");
  const editEmail = document.getElementById("editEmail");
  const editSdt = document.getElementById("editSdt");
  const editGioiTinh = document.getElementById("editGioiTinh");
  const editKhoa = document.getElementById("editKhoa");
  const editedData = {
    name: editName.value,
    email: editEmail.value,
    sdt: editSdt.value,
    gioitinh: editGioiTinh.value,
    khoa: editKhoa.value,
  };

  // Gửi yêu cầu PUT/PATCH để cập nhật
  axios
    .patch(`/api/v1/users/${userId}`, editedData)
    .then((response) => {
      console.log("user updated successfully", response.data);
      closeEditModal();
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
