import api from '../utils/stuParentAPI'
export default{
  data(){
    return {
      dataList: [],
      onePage: [],
      nowPage: 1,
      pageSize: 0
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
      console.log(obj);
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          console.log(data.data.data);
          this.searchStu = data.data.data
          this.dataList = data.data.data;
          this.pageSize = obj.pageSize;
          return this.getOnePage;
        }
        return data.data.msg
      })
    },
    // 分页
    Paging(nowPage) {
      this.nowPage = nowPage;
      return this.getOnePage;
    },
    // 删除数据的方法
    DeleteData(obj) {
      console.log(obj);
      return this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api[obj.name](obj.data).then(data => {
          console.log(data);
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
  },
  computed: {
    // 显示一页数据
    getOnePage() {
      let begin = (this.nowPage - 1) * this.pageSize;
      this.onePage = this.dataList.slice(begin, begin + this.pageSize);
      return { onePageData: this.onePage, totalPages: this.dataList.length }
    }
  }
}