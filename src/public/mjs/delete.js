function deleteNotify(notifyId) {
  const confirmation = confirm("Bạn có chắc chắn muốn xóa thông báo này?");
  if (confirmation) {
    // Sử dụng Axios để thực hiện yêu cầu DELETE
    axios
      .delete(`/api/v1/notifys/${notifyId}`)
      .then((response) => {
        location.reload();
      })
      .catch((error) => {
        console.error("Error deleting notify:", error);
        // Xử lý lỗi nếu có
      });
  }
}
