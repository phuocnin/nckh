// Khi người dùng chọn chỉnh sửa
function editUser(userId) {
  // Gửi yêu cầu GET để lấy dữ liệu  hiện tại
  axios
    .get(`/api/v1/users/${userId}`)
    .then((response) => {
      const userData = response.data.data;
      // Hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
      showEditFormUser(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

// Hàm hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
function showEditFormUser(userData) {
  const editName = document.getElementById(`editName-${userData._id}`);
  const editEmail = document.getElementById(`editEmail-${userData._id}`);
  const editSdt = document.getElementById(`editSdt-${userData._id}`);
  const editGioiTinh = document.getElementById(`editGioiTinh-${userData._id}`);
  const editKhoa = document.getElementById(`editKhoa-${userData._id}`);
  // Điền dữ liệu vào biểu mẫu chỉnh sửa
  editName.value = userData.name;
  editEmail.value = userData.email;
  editSdt.value = userData.sdt;
  editGioiTinh.value = userData.gioitinh;
  editKhoa.value = userData.khoa;

  // Hiển thị modal chỉnh sửa
  const editModal = document.getElementById(`editUser-${userData._id}`);
  editModal.style.display = "block";
}

// Hàm đóng modal chỉnh sửa
function closeEditModalUser(userId) {
  const editModal = document.getElementById(`editUser-${userId}`);
  editModal.style.display = "none";
  location.reload();
}

// Hàm lưu thông báo chỉnh sửa
function saveEditFormUser(userId) {
  const editName = document.getElementById(`editName-${userId}`);
  const editEmail = document.getElementById(`editEmail-${userId}`);
  const editSdt = document.getElementById(`editSdt-${userId}`);
  const editGioiTinh = document.getElementById(`editGioiTinh-${userId}`);
  const editKhoa = document.getElementById(`editKhoa-${userId}`);
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
      closeEditModalUser(userId);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
