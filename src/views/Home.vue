<template>
  <el-container>
    <el-aside
      class="asideLeft"
      width="280px"
      :style="{ height: getAsideHeight }"
    >
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
          <div v-for="item in menuList" :key="item.menuId">
            <el-submenu :index="item.componentPath" v-if="item.subMenu.length>0">
              <template slot="title">
                <i :class="item.menuIcon"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <el-menu-item-group
                v-for="subItem in item.subMenu"
                :key="subItem.menuId"
              >
                <el-menu-item :index="subItem.componentPath">{{
                  subItem.menuName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.componentPath" v-else>
              <i :class="item.menuIcon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <div class="userBox">
          <div class="messageBox" v-if="$store.state.loginModules.userShenfen == '学生'||$store.state.loginModules.userShenfen == '老师'||$store.state.loginModules.userShenfen == '班主任'">
            <!-- <el-badge :value="3" class="item">
              <span class="iconfont icon-lingdang"></span>
            </el-badge> -->
            <el-badge :value="$store.state.loginModules.liuyanNum" class="item">
              <span class="iconfont icon-xinfeng"></span>
            </el-badge>
          </div>
          <router-link :to="{ path: '/Home/PersonalCenter' }">
            <el-avatar v-if="$store.state.loginModules.userShenfen == '学生'"
 class="headerSpan" :size="50"
              ><img :src="user1" alt=""
            /></el-avatar>
          <el-avatar v-else-if="$store.state.loginModules.userShenfen == '家长'" class="headerSpan" :size="50"
              ><img :src="user" alt=""
            /></el-avatar>

            <el-avatar v-else class="headerSpan" :size="50"
              ><img :src="user2" alt=""
            /></el-avatar>


            <!-- :src="{{user.parentImg}}" -->
          </router-link>
          <div class="exitBox" @click="tuichu">
            退出登录<span class="iconfont icon-tuichu"></span>
          </div>
        </div>
      </el-header>
      <el-main class="asideLeft">
        <div class="contentBox">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

import homeMixins from "../mixins/homeMixins";
export default {
  data() {
    return {
      user: this.$store.state.loginModules.user.parentImg,
      user1:this.$store.state.loginModules.user.studentPhoto,
      user2:this.$store.state.loginModules.user.staffImg,
      bodyHeight: window.innerHeight,
      currentIndex: 0,
      // navList: [
      //   {
      //     id: 1,
      //     index: "1",
      //     name: "首页",
      //     path: "/Home/HomePage",
      //     icon: "el-icon-dish",
      //     children: "",
      //   },
      //   {
      //     id: 2,
      //     index: "2",
      //     name: "学生管理",
      //     icon: "el-icon-knife-fork",
      //     path: "/Home/StudentMgt",
      //     children: [
      //       {
      //         id: 2 - 1,
      //         index: "2-1",
      //         name: "学生信息管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/StudentInfo",
      //       },
      //       {
      //         id: 2 - 2,
      //         index: "2-2",
      //         name: "学生家长管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/StuParentMgt",
      //       },
      //       {
      //         id: 2 - 3,
      //         index: "2-3",
      //         name: "学生成绩管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/StudentScore",
      //       },
      //     ],
      //   },
      //   {
      //     id: 3,
      //     index: "3",
      //     name: "教学管理",
      //     path: "/Home/EduMgt",
      //     icon: "el-icon-food",
      //     children: [
      //       {
      //         id: 3 - 1,
      //         index: "3-1",
      //         name: "考试管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/ExamMgt",
      //       },
      //       {
      //         id: 3 - 2,
      //         index: "3-2",
      //         name: "考勤管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/CheckInMgt",
      //       },
      //       {
      //         id: 3 - 3,
      //         index: "3-3",
      //         name: "课程管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/CourseMgt",
      //       },
      //     ],
      //   },
      //   {
      //     id: 4,
      //     index: "4",
      //     name: "师资管理",
      //     path: "/Home/TeaInfo",
      //     icon: "el-icon-food",
      //     children: [
      //       {
      //         id: 4 - 1,
      //         index: "4-1",
      //         name: "教师信息管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/TeacherInfo",
      //       },
      //       {
      //         id: 4 - 2,
      //         index: "4-2",
      //         name: "教务管理",
      //         icon: "el-icon-knife-fork",
      //         path: "/Home/EduAdminiStration",
      //       },
      //     ],
      //   },
      //   {
      //     id: 5,
      //     index: "5",
      //     name: "留言板",
      //     path: "/Home/MemoMgt",
      //     icon: "el-icon-dish",
      //     children: "",
      //   },
      //   {
      //     id: 6,
      //     index: "6",
      //     name: "教室管理",
      //     path: "/Home/ClassRoomMgt",
      //     icon: "iconfont icon-jiaoshiguanli1",
      //     children: "",
      //   },
      //   {
      //     id: 7,
      //     index: "7",
      //     name: "关键字管理",
      //     path: "/Home/AddMemoMgt",
      //     icon: "iconfont icon-minganguanjianzi",
      //     children: "",
      //   },
      // ],
      menuList:this.$store.state.loginModules.userMenulist
    };
  },
  mixins: [homeMixins],
  methods: {
    ...mapMutations(["loginModules/mutationsLoginOut"]),
    ...mapActions(["loginModules/LoginAction1"]),

    //获取留言未读数量
    liuyanshuliang(){
        this["loginModules/LoginAction1"]({
        name: "LIUYANNUM_API",
        data: {},
      }).then((data) => {
        console.log(data);
        // if(data==200){
        //   console.log('chengg');
        //   this.$router.push("/Home");
          
        // }
      })
       .catch((error)=> {
          console.log(error);
        });
    },
    // 退出登录
    tuichu() {
      this.$confirm("您确定要退出登录吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "您已退出登录!",
            offset: 100,
          });
          this["loginModules/mutationsLoginOut"]();
          this.$router.push("/Login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作",
            offset: 100,
          });
        });
    },
    // 导航菜单
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
  created() {
    if(this.$store.state.loginModules.userShenfen !== '家长'){
      this.liuyanshuliang();
    }
    
    console.log(this.menuList);
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
  justify-content: flex-end;
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
    line-height: 90px;
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
// 签到
.signInBox {
  width: 50%;
  // border: 1px solid greenyellow;
  display: flex;
  font-size: 1.8rem;
  h3 {
    margin-left: 3rem;
    cursor: pointer;
    // border: 1px solid red;
    user-select: none;
  }
  p {
    margin: 0 3rem;
    color: gray;
  }
}
// 签到成功
.signInSuccess {
  color: #f66077;
}
// 未签到或失败
.signInError {
  color: #228ab9;
}
// header-----user
.userBox {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
  padding-left: 10px;
  box-sizing: border-box;
  // border: 1px solid red;
  a {
    line-height: 80px;
    span {
      margin-top: 20px;
    }
  }
}
.exitBox {
  background-color: #c5e3d2;
  padding: 0 15px;
  cursor: pointer;
}
.messageBox {
  // border: 1px solid green;
  span {
    margin: 0 10px;
    font-size: 3rem;
  }
}
.el-avatar > img {
  width: 100%;
}
.headerSpan {
  cursor: pointer;
  margin: 0 10px;
}
/deep/.el-badge__content.is-fixed {
  top: 25px;
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

.asideLeft::-webkit-scrollbar {
  width: 6px;
}
.asideLeft::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgb(194, 194, 194);
  background-color: rgb(63, 140, 240);
}
.asideLeft::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(185, 185, 185);
  border-radius: 0;
  background-color: rgb(189, 189, 189);
}

</style>