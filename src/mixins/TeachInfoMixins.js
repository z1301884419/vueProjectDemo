import api from '../utils/eduAdmApi'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // 错误弹框
    openError(title, msg) {
      this.$notify.error({
        title: title,
        message: msg
      });
    },
    // 成功的弹框
    openSuccess(title, msg) {
      this.$notify({
        title: title,
        message: msg,
        type: 'success'
      });
    },
    // 提示信息
    openInfo(title, msg) {
      this.$notify.info({
        title: title,
        message: msg
      });
    },
    // 获取总数据
    getAllData(obj) {
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          return {data: data.data.data, count: data.data.count};
        }
        return data.data.msg
      })
    },
    // 删除数据的方法
    DeleteDataT(obj) {
      return this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api[obj.name](obj.data).then(data => {
          console.log('删除', data);
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
    ModifyDateT(obj) {
      return api[obj.name](obj.data).then(data => {
        console.log('修改', data);
        if (data.data.code == 200) {
          this.openSuccess("修改成功", "该信息已修改成功!")
        }
        return data.data.code
      })
    },
    // 新增数据的方法
    InsertDateT(obj) {
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          this.openSuccess("提交成功", "该信息已提交成功!")
        }
        return data.data.code
      })
    },
  }
}