export default function (data) {
  let { text,requestFn,requestData} = data
  return new Promise((resolve) => {
    this.$confirm(`你确定要${text}吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      requestFn(requestData).then(res=>{
        console.log(res);
        if(res.code==200){
          this.$message({
            type: 'success',
            message: `${data.text}成功!`,
          });
          resolve()//成功resolve
        }else {
          this.$message({
            type: 'error',
            message: `${data.text}失败!`,
          });
        }
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: `${data.text}失败!`,
        });
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: `已取消${data.text}`
      });
    });
  })
}