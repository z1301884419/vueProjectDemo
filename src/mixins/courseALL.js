import api from '../utils/coursemgtApi'


export default {
  data() {

  },
  methods: {
    //    班级
       classallList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //年级
      gradeallList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //获取所有科目
      subjectallList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //添加课程
      courseaddList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //删除课程
      coursedelList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //查询班级课表
      coursefindClassCourseList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
      //修改课程
      courseupdateList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
  }
}