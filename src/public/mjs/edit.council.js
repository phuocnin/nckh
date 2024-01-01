// // Khi người dùng chọn chỉnh sửa thông báo
// function editCouncil(councilId) {
//   // Gửi yêu cầu GET để lấy dữ liệu thông báo hiện tại
//   axios
//     .get(`/api/v1/councils/${councilId}`)
//     .then((response) => {
//       const councilData = response.data.data;
//       // Hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
//       showEditForm(councilData);
//     })
//     .catch((error) => {
//       console.error("Error fetching council data:", error);
//     });
// }

// // Hàm hiển thị modal chỉnh sửa và điền dữ liệu vào biểu mẫu
// function showEditForm(councilData) {
//   const editName = document.getElementById(`editName-${councilData._id}`);
//   const editChuTich = document.getElementById(
//     `userDropdown-editChuTich-${councilData._id}`
//   );
//   const editThuKy = document.getElementById(
//     `userDropdown-editThuKy-${councilData._id}`
//   );
//   const editUyVien1 = document.getElementById(
//     `userDropdown-editUyVien1-${councilData._id}`
//   );
//   const editUyVien2 = document.getElementById(
//     `userDropdown-editUyVien2-${councilData._id}`
//   );
//   // Điền dữ liệu vào biểu mẫu chỉnh sửa
//   editNameInput.value = councilData.TenHoiDong;
//   editChuTichInput.value = councilData.ChuTich;
//   editThuKyInput.value = councilData.Thuky;
//   editUyVien1Input.value = councilData.UyVien1;
//   editUyVien2Input.value = councilData.UyVien2;
//   // Hiển thị modal chỉnh sửa
//   const editCouncil = document.getElementById(`council-${councilData._id}`);
//   editCouncil.style.display = "block";
// }

// // Hàm đóng modal chỉnh sửa
// function closeEditCouncil(councilId) {
//   const editCouncil = document.getElementById(`council-${councilData._id}`);
//   editCouncil.style.display = "none";
//   location.reload();
// }
// // Hàm lưu thông báo chỉnh sửa
// function saveEditCouncil(councilId) {
//   const editNameInput = document.getElementById(`editName-${councilId}`);
//   const editChuTichInput = document.getElementById(
//     `userDropdown-editChuTich-${councilId}`
//   );
//   const editThuKyInput = document.getElementById(
//     `userDropdown-editThuKy-${councilId}`
//   );
//   const editUyVien1Input = document.getElementById(
//     `userDropdown-editUyVien1-${councilId}`
//   );
//   const editUyVien2Input = document.getElementById(
//     `userDropdown-editUyVien2-${councilId}`
//   );

//   const editedData = {
//     TenHoiDong: editNameInput.value,
//     ChuTich: editChuTichInput.value,
//     Thuky: editThuKyInput.value,
//     UyVien1: editUyVien1Input.value,
//     UyVien2: editUyVien2Input.value,
//   };

//   // Gửi yêu cầu PUT/PATCH để cập nhật thông báo
//   axios
//     .patch(`/api/v1/notifys/${councilId}`, editedData)
//     .then((response) => {
//       closeEditCouncil(councilId);
//     })
//     .catch((error) => {
//       console.error("Error updating notify:", error);
//     });
// }
