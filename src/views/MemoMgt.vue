<template>
  <div class="memoBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>留言板</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="liuyanMain">
      <el-card shadow="never">
        <el-input type="textarea" v-model="input"></el-input>
        <el-button size="mini" class="successBtn">选择老师</el-button>
        <el-button size="mini" class="successBtn">发表</el-button>
      </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的留言板" name="first">
          <el-card shadow="hover" v-for="item in tableData" :key="item.id">
            <div class="contentCard">
              <div class="content">
                <span class="contentTitle"
                  >{{ item.teacher }}({{ item.subject }}老师):</span
                >
                <span>{{ item.content }}</span>
                <p
                  v-for="subItem in item.subList"
                  :key="subItem.id"
                  class="repalyBox"
                >
                  <span class="replyTitle">{{ subItem.repalyName }}：</span>
                  <span>{{ subItem.content }}</span>
                </p>
                <el-input
                  v-if="item.id == id"
                  class="inputBox"
                  type="textarea"
                  v-model="input2"
                ></el-input>
                <el-button v-if="item.id == id" size="mini" class="successBtn"
                  >回复</el-button
                >
              </div>
              <div class="caozuoBox">
                <el-button size="mini" round>删除</el-button>
                <el-button
                  size="mini"
                  v-if="item.id != id"
                  round
                  @click="replyClick(item.id)"
                  >回复</el-button
                >
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="我收到的回复" name="second">
          <el-card shadow="hover" v-for="item in tableData" :key="item.id">
            <div class="contentCard">
              <div class="content">
                <span class="contentTitle"
                  >{{ item.teacher }}({{ item.subject }}老师)123:</span
                >
                <span>{{ item.content }}</span>
                <p
                  v-for="subItem in item.subList"
                  :key="subItem.id"
                  class="repalyBox"
                >
                  <span class="replyTitle">{{ subItem.repalyName }}：</span>
                  <span>{{ subItem.content }}</span>
                </p>
                <el-input
                  v-if="item.id == id"
                  class="inputBox"
                  type="textarea"
                  v-model="input2"
                ></el-input>
                <el-button v-if="item.id == id" size="mini" class="successBtn"
                  >回复</el-button
                >
              </div>
              <div class="caozuoBox">
                <el-button size="mini" round>删除</el-button>
                <el-button
                  size="mini"
                  v-if="item.id != id"
                  round
                  @click="replyClick(item.id)"
                  >回复</el-button
                >
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <!-- <h3>
        <span class="selectMyMemo memoActive">我的留言板</span>
        <el-divider direction="vertical"></el-divider>
        <span class="selectHuiFu">我收到的回复</span>
      </h3> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      input: "",
      input2: "",
      id: 0,
      tableData: [
        {
          id: 1,
          teacher: "李四",
          subject: "语文",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
          subList: [{ id: 1 - 1, repalyName: "大大", content: "谢谢老师！" }],
        },
        {
          id: 2,
          teacher: "张三",
          subject: "数学",
          content: "学习认真, 作业完成程度好, 继续发扬!!",
        },
        {
          id: 3,
          teacher: "王五",
          subject: "英语",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
        },
        {
          id: 4,
          teacher: "吴六",
          subject: "历史",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
        },
      ],
    };
  },
  methods: {
    replyClick(id) {
      this.id = id;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="less" scoped>
.memoBox {
  width: 100%;
}
.liuyanMain {
  width: 98%;
  margin: 10px auto;
  h3 {
    margin: 10px 0;
    font-size: 1.8rem;
  }
}
// 分割线
.el-divider--horizontal {
  margin: 0;
}
// 面包屑导航
.el-breadcrumb {
  padding-left: 1rem;
  line-height: 3;
  font-size: 1.6rem;
}
.successBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.successBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
.el-button {
  margin-top: 1rem;
}
// 回复框
.contentCard {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .content {
    width: 90%;
    line-height: 2rem;
    padding: 1rem;
    .inputBox {
      margin-top: 1rem;
    }
    .contentTitle {
      color: #16b387;
    }
    .replyTitle {
      color: #2867ee;
    }
    .repalyBox {
      margin-left: 10px;
    }
  }
}
.content {
  width: 90%;
}
.caozuoBox {
  width: 10%;
}
.div1 {
  // border: 1px solid rebeccapurple;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
.memoActive {
  color: #16b33d;
}
.selectHuiFu,
.selectMyMemo {
  cursor: pointer;
}
</style>