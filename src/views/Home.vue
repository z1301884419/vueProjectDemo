<template>
  <el-container>
    <el-aside width="280px" :style="{ height: getAsideHeight }">
      <div class="asideTitle">
        <div><img src="../assets/img/logo.png" alt="" /></div>
        <p>家校通后台管理</p>
      </div>
      <div class="navBox">
        <el-menu
          router
          default-active="1"
          @open="handleOpen"
          @close="handleClose"
        >
          <div v-for="item in navList" :key="item.id">
            <el-submenu :index="item.path" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <el-menu-item :index="subItem.path">{{
                  subItem.name
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.path" v-else>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <div class="userBox">
          <div class="messageBox">
            <el-badge :value="3" class="item">
              <span class="iconfont icon-lingdang"></span>
            </el-badge>
            <el-badge :value="4" class="item">
              <span class="iconfont icon-xinfeng"></span>
            </el-badge>
          </div>
          <el-avatar class="headerSpan" :size='50'> user </el-avatar>
          <div class="exitBox">
            退出登录<span class="iconfont icon-tuichu"></span>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="contentBox">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      bodyHeight: window.innerHeight,
      currentIndex: 0,
      navList: [
        {
          id: 1,
          index: "1",
          name: "首页",
          path: "/Home/HomePage",
          icon: "el-icon-dish",
          children: "",
        },
        {
          id: 2,
          index: "2",
          name: "学生管理",
          icon: "el-icon-knife-fork",
          path: "/Home/StudentMgt",
          children: [
            {
              id: 2 - 1,
              index: "2-1",
              name: "学生信息管理",
              icon: "el-icon-knife-fork",
              path: "/Home/StudentInfo",
            },
            {
              id: 2 - 2,
              index: "2-2",
              name: "学生家长管理",
              icon: "el-icon-knife-fork",
              path: "/Home/StuParentMgt",
            },
            {
              id: 2 - 3,
              index: "2-3",
              name: "学生成绩管理",
              icon: "el-icon-knife-fork",
              path: "/Home/StudentScore",
            },
          ],
        },
        {
          id: 3,
          index: "3",
          name: "教学管理",
          path: "/Home/EduMgt",
          icon: "el-icon-food",
          children: [
            {
              id: 3 - 1,
              index: "3-1",
              name: "考试管理",
              icon: "el-icon-knife-fork",
              path: "/Home/ExamMgt",
            },
            {
              id: 3 - 2,
              index: "3-2",
              name: "考勤管理",
              icon: "el-icon-knife-fork",
              path: "/Home/CheckInMgt",
            },
            {
              id: 3 - 3,
              index: "3-3",
              name: "课程管理",
              icon: "el-icon-knife-fork",
              path: "/Home/CourseMgt",
            },
          ],
        },
        {
          id: 4,
          index: "4",
          name: "师资管理",
          path: "/Home/TeaInfo",
          icon: "el-icon-food",
          children: [
            {
              id: 4 - 1,
              index: "4-1",
              name: "教师信息管理",
              icon: "el-icon-knife-fork",
              path: "/Home/TeacherInfo",
            },
            {
              id: 4 - 2,
              index: "4-2",
              name: "教务管理",
              icon: "el-icon-knife-fork",
              path: "/Home/EduAdminiStration",
            },
          ],
        },
        {
          id: 5,
          index: "5",
          name: "留言板",
          path: "/Home/MemoMgt",
          icon: "el-icon-dish",
          children: "",
        },
      ],
    };
  },
  methods: {
    changeIndex(n) {
      this.currentIndex = n;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    getAsideHeight() {
      return this.bodyHeight + "px";
    },
  },
  mounted() {
    window.onresize = () => {
      this.bodyHeight = window.innerHeight;
    };
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #92d8c5;
  color: #333;
  line-height: 80px;
  border-radius: 0 0 0 30px;
  display: flex;
  padding: 0;
}

.el-aside {
  background-color: #c5e3d2;
  color: #333;
  text-align: center;
  border-radius: 0 0 80px 0;
}

.el-main {
  background-color: white;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
// 侧边导航
// 标题
.asideTitle {
  width: 100%;
  height: 12rem;
  background-color: #ebf3fb;
  border-radius: 0 0 50px 50px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  div {
    width: 30%;
    height: 80px;
    // border: 1px solid red;
    img {
      width: 100%;
    }
  }
  p {
    margin: 0;
    height: 80px;
    line-height: 80px;
    font-size: 2.2rem;
    color: #16b387;
  }
}
// 78c5b0  C5E3D2   B2DBD4  16B387  F9D789  D4EDF9 EBF3FB  87C1EB
//导航
.navBox {
  // border: 1px solid red;
  margin-top: 5rem;
  /deep/.el-submenu__title {
    font-size: 2rem;
  }
  /deep/.el-menu-item-group {
    ul {
      li {
        text-align: center;
      }
    }
  }
  ul {
    background-color: transparent;
  }
  div {
    li {
      text-align: left;
      font-size: 2rem;
      i {
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
  }
}
// header-----user
.userBox {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
  padding-left: 10px;
  box-sizing: border-box;
  // border: 1px solid red;
}
.exitBox {
  background-color: #c5e3d2;
  padding: 0 15px;
}
.messageBox {
  // border: 1px solid green;
  span {
    margin: 0 10px;
    font-size: 3rem;
  }
}
.headerSpan {
  cursor: pointer;
  margin: 0 10px;
}
/deep/.el-badge__content.is-fixed{
  top:25px;
  right: 25px;
}
// 内容
.contentBox {
  width: 98%;
  height: 98%;
  margin: auto;
  border-radius: 20px;
  margin-top: 1rem;
  background-color: #edf6ff;
}
.el-main {
  padding: 0;
}
</style>