export default function (data) {
  return new Promise((resolve) => {
    this.$confirm(`你确定要${data.text}吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: `${data.text}成功!`,
      });
      resolve()//成功resolve
    }).catch(() => {
      this.$message({
        type: 'info',
        message: `已取消${data.text}`
      });
    });
  })
}