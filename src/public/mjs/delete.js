function deleteNotify(notifyId) {
  const confirmation = confirm("Bạn có chắc chắn muốn xóa thông báo này?");
  if (confirmation) {
    // Sử dụng Axios để thực hiện yêu cầu DELETE
    axios
      .delete(`/api/v1/notifys/${notifyId}`)
      .then((response) => {
        // Xử lý kết quả sau khi xóa thành công
        console.log("Notify deleted successfully", response.data);
        // Đoạn mã tương ứng với cập nhật UI hoặc tải lại dữ liệu
        location.reload();
      })
      .catch((error) => {
        console.error("Error deleting notify:", error);
        // Xử lý lỗi nếu có
      });
  }
}
