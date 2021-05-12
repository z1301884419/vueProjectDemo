// import api from '../utils/api'
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
    // // 获取总数据
    // getAllData(obj) {
    //   return api[obj.name](obj.data).then(data => {
    //     if (data.data.code == 200) {
    //       console.log(data);
    //       this.searchStu = data.data.list
    //       this.dataList = data.data.list;
    //       this.pageSize = obj.pageSize;
    //       return this.getOnePage;
    //     }
    //     // 登录失败: 返回登录失败的结果
    //     return data.data.msg
    //   })
    // },
    // // 分页
    // Paging(nowPage) {
    //   this.nowPage = nowPage;
    //   return this.getOnePage;
    // },
    // // 获取总数据
    // getAllData2(obj) {
    //   return api[obj.name](obj.data).then(data => {
    //     if (data.data.code == 200) {
    //       this.dataList2 = data.data.list;
    //       this.pageSize2 = obj.pageSize;
    //       return this.getOnePage2;
    //     }
    //     return data.data.msg
    //   })
    // },
    // // 分页
    // Paging2(nowPage) {
    //   this.nowPage2 = nowPage;
    //   console.log(this.getOnePage);
    //   return this.getOnePage2;
    // },
    // // 搜索的方法
    // SearchInfoFn(obj){
    //   this.dataList = this.searchStu.filter(item => item.baoXiuZhuangTai.indexOf(obj.status) > -1 && item.mingCheng.indexOf(obj.dorm) > -1);
    //   return this.getOnePage
    // },
    // // 搜索的方法
    // SearchStuInfoFn(obj){
    //   this.dataList = this.searchStu.filter(item => item.xueHao.indexOf(obj) > -1 );
    //   console.log(this.dataList);
    //   return this.getOnePage
    // },
    // // 删除数据的方法
    // DeleteData(obj) {
    //   return this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     return api[obj.name](obj.data).then(data => {
    //       if (data.data.code == 200) {
    //         this.openSuccess('删除成功', '该数据已成功移出!');
    //         return 200
    //       } else {
    //         this.openError('删除失败', '删除失败，请重新删除!');
    //         return 400
    //       }
    //     })
    //   }).catch(() => {
    //     this.openInfo('提示', "操作已取消!");
    //   });
    // },
    // // 修改数据的方法
    // ModifyDate(obj) {
    //   return api[obj.name](obj.data).then(data => {
    //     console.log(data);
    //     if (data.data.code == 200) {
    //       this.openSuccess("修改成功", "该信息已修改成功!")
    //     }
    //     return data.data.code
    //   })
    // },
    // // 新增数据的方法
    // InsertDate(obj) {
    //   return api[obj.name](obj.data).then(data => {
    //     console.log(data);
    //     if (data.data.code == 200) {
    //       this.openSuccess("提交成功", "该信息已提交成功!")
    //     }
    //     return data.data.code
    //   })
    // },
    // // 查询
    // getDiaLogData(obj) {
    //   return api[obj.name](obj.data).then(data => {
    //     if (data.data.code == 200) {
    //       console.log(data.data);
    //       return data.data.list || data.data.obj
    //     }
    //     return data.data.msg
    //   })
    // },
    // GetDateTimeToString() {
    //   let date_ = new Date();
    //   let year = date_.getFullYear();
    //   let month = date_.getMonth() + 1;
    //   let day = date_.getDate();
    //   if (month < 10) month = "0" + month;
    //   if (day < 10) day = "0" + day;

    //   let hours = date_.getHours();
    //   let mins = date_.getMinutes();
    //   let secs = date_.getSeconds();
    //   let msecs = date_.getMilliseconds();
    //   if (hours < 10) hours = "0" + hours;
    //   if (mins < 10) mins = "0" + mins;
    //   if (secs < 10) secs = "0" + secs;
    //   if (msecs < 10) secs = "0" + msecs;
    //   return year + "-" + month + "-" + day + " " + hours + ":" + mins + ":" + secs;
    // }
  },
  computed: {
    // 显示一页数据
    // getOnePage() {
    //   let begin = (this.nowPage - 1) * this.pageSize;
    //   this.onePage = this.dataList.slice(begin, begin + this.pageSize);
    //   return { onePageData: this.onePage, totalPages: this.dataList.length }
    // },
    // // 显示一页数据
    // getOnePage2() {
    //   let begin = (this.nowPage2 - 1) * this.pageSize;
    //   this.onePage2 = this.dataList2.slice(begin, begin + this.pageSize);
    //   return { onePageData: this.onePage2, totalPages: this.dataList2.length }
    // }
  }
}