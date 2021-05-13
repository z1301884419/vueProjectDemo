import api from '../utils/checkInApi'
export default {
  data() {

  },
  methods: {
    // 删除的方法
    mixinDelFn(obj) {
      console.log(obj);
      return this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(data => {
        console.log(data);
        return api[obj.name](obj.params).then(data => {
          if (data.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            return 200
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
            return 400
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    //查询一页数据方法
    selectAllData(obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        // if (data.data.code == 200) {
          
        // }
      })
    }
  }
}