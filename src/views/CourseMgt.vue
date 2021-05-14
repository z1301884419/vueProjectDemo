<template>
  <div style="width:90%;margin: 0 auto">
    <div class="form-box">
      <!-- 下拉选择框 -->
      <el-select
        v-model="formData.grade"
        placeholder="请选择"
        style="margin-right: 15px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <!-- 搜索框 -->
      <el-input
        placeholder="请输入任课老师"
        v-model="formData.teacherName"
        clearable
        style="width: 200px; margin-right: 15px"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" style="color:#53b08a;background:white;border:1px solid #53b08a">搜索</el-button>
    </div>

    <!-- 课程表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="classId" label="ID"> </el-table-column>
      <el-table-column prop="className" label="班级名称"> </el-table-column>
      <el-table-column prop="courseOne" label="第一节课">
        <template slot-scope="scope">
          <span>{{ scope.row.courseOne == 'yuwen' ? '语文' : scope.row.courseOne }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="courseTwo" label="第二节课"> </el-table-column>
      <el-table-column prop="courseThree" label="第三节课"> </el-table-column>
      <el-table-column prop="courseFour" label="第四节课"> </el-table-column>
      <el-table-column prop="courseFive" label="第五节课"> </el-table-column>
      <el-table-column prop="courseSix" label="第六节课"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改课程" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <div>
          <el-input
            v-model="form.className"
            clearable
            disabled
            style="width: 200px; margin-right: 15px"
          >
          </el-input>
          </div>
        </el-form-item>
        <el-form-item label="第一节课" :label-width="formLabelWidth">
          <div>
          <el-select v-model="form.courseOne" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </div>
        </el-form-item>
          <el-form-item label="第二节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseTwo" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="第三节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseThree" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="第四节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseFour" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="第五节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseFive" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="第六节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseSix" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" 
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "一年级",
        },
        {
          value: "选项2",
          label: "二年级",
          disabled: true,
        },
        {
          value: "选项3",
          label: "三年级",
        },
        {
          value: "选项4",
          label: "四年级",
        },
        {
          value: "选项5",
          label: "五年级",
        },
      ],
      formData: {
        grade: "",
        teacherName: "",
      },
      formLabelWidth: '30%',
      form: {
        classId: "",
        className: "",
        courseOne: "",
        courseTwo: "",
        courseThree: "",
        courseFour: "",
        courseFive: "",
        courseSix: "",
      },
      value: [],
      list: [],
      tableData: [
        {
          classId: "1",
          className: "一年级一班",
          courseOne: "yuwen",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "2",
          className: "一年级二班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "3",
          className: "一年级三班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "4",
          className: "一年级四班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "5",
          className: "一年级五班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "6",
          className: "一年级六班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "7",
          className: "一年级七班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
        {
          classId: "8",
          className: "一年级八班",
          courseOne: "语文",
          courseTwo: "数学",
          courseThree: "数学",
          courseFour: "数学",
          courseFive: "数学",
          courseSix: "数学",
        },
      ],
      loading: false,
      dialogFormVisible: false,
    };
  },
  // created() {
  //   this.tableData.map((item) => {
  //     return item
  //   })
  // },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row);
      this.form.classId = row.classId
      this.form.className = row.className
      this.form.courseOne = row.courseOne
      this.form.courseTwo = row.courseTwo
      this.form.courseThree = row.courseThree
      this.form.courseFour = row.courseFour
      this.form.courseFive = row.courseFive
      this.form.courseSix = row.courseSix
      this.dialogFormVisible = true;
    },
    handleSubmit(){
      console.log(this.form)
      this.tableData = this.tableData.map((item) => {
        if (item.classId == this.form.classId) {
          item = this.form
         this.dialogFormVisible = false
        }
        return item
        
      })
      // this.$http.post('url', this.form).then((res) => {
      //   console.log(res)
      //   this.dialogFormVisible = false
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  },
};
</script>


<style lang="less" scoped>
.form-box {
  display: flex;
  margin-bottom: 2px;
  
}
</style>