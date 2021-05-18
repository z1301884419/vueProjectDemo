import api from '../utils/teacherAPI'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // 获取总数据
    getAllDataT(obj) {
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          console.log(data.data);
          return {data:data.data.data, count: data.data.count};
        }
        return data.data.msg
      })
    },
    // 删除数据的方法
    DeleteData(obj) {
      
      return this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            this.openSuccess('删除成功', '该数据已成功移出!');
            return 200
          } else {
            this.openError('删除失败', '删除失败，请重新删除!');
            return 400
          }
        })
      }).catch(() => {
        this.openInfo('提示', "操作已取消!");
      });
    },
    // 修改数据的方法
    ModifyDate(obj) {
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          this.openSuccess("修改成功", "该信息已修改成功!")
        }
        return data.data.code
      })
    },
    // 新增数据的方法
    InsertDate(obj) {
      console.log(obj);
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          this.openSuccess("提交成功", "该信息已提交成功!")
        }
        return data.data.code
      })
    },
  },
}