<template>
  <div class="homeBox">
    <!-- 左边主页 -->
    <div class="homeMainBox">
      <h1>成都第七中学--学校简介</h1>
      <!-- banner -->
      <div class="block">
        <!-- height="300px" -->
        <el-carousel trigger="click">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <h3 class="small"><img :src="item.src" /></h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 头条新闻 -->
      <!-- <h1>头条新闻 HEADLINE</h1> -->
      <div class="mainNewsBox">
        <p>
          宜宾东辰学校小学部始终坚持“为学生幸福生活奠基，对学生终生发展负责”的办学理念，实施“全面发展的素质教育、全员成才的精致教育、因材施教的个性教育、内涵发展的智慧教育”的教育教学方略，依托本部小学的教育教学资源，努力打造“今天幸福、明天美好”的小学教育品牌。
        </p>
        <!-- <div class="newsLeft1">
          <ul>
            <li>
              <div class="newsLiImgBox">
                <img src="../assets/img/new1.jpeg" alt="" />
              </div>
              <div class="newsLiTitleBox">
                <a href="">共青团武汉大学第十四次代表大会召开</a>
                <h4>青春向党，奋斗强国</h4>
              </div>
            </li>
            <li>
              <div class="newsLiImgBox">
                <img src="../assets/img/new2.png" alt="" />
              </div>
              <div class="newsLiTitleBox">
                <a href="">袁玉峰、杜巍巍分别获全国和省五一劳动奖章</a>
                <h4>
                  要以受到表彰的先进模范为榜样，弘扬劳模精神、劳动精神、工匠精神
                </h4>
              </div>
            </li>
            <li>
              <div class="newsLiImgBox">
                <img src="../assets/img/new3.jpeg" alt="" />
              </div>
              <div class="newsLiTitleBox">
                <a href="">我校4项科技成果获高等学校科学研究优秀成果奖</a>
                <h4>以第一完成单位获一等奖3项(含专用项目)、二等奖1项</h4>
              </div>
            </li>
          </ul>
        </div>
        <div class="newsRight3">
          <ul>
            <li>
              <a href="">共青团武汉大学第十四次代表大会召开</a>
              <h4>青春向党，奋斗强国</h4>
            </li>
            <li>
              <a href="">共青团武汉大学第十四次代表大会召开</a>
              <h4>青春向党，奋斗强国</h4>
            </li>
            <li>
              <a href="">共青团武汉大学第十四次代表大会召开</a>
              <h4>青春向党，奋斗强国</h4>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    <!-- 右边签到和公告处 -->
    <div class="homeRightBox">
      <!-- 签到模块 -->
      <div class="homeRTopBox">
        <!-- 签到 -->
        <div
          class="signInBox"
          v-if="$store.state.loginModules.userShenfen == '学生'"
        >
          <h3 class="signInBtn" v-if="signInFlag" @click="signInFn">
            <i class="el-icon-alarm-clock"></i>上课打卡
          </h3>
          <h3 v-else @click="signOutFn">
            <i class="el-icon-alarm-clock"></i>下课打卡
          </h3>
          <p>(点击上方进行签到)</p>
          <p>
            <i class="el-icon-location-information"></i>状态:<span>{{
              signInText
            }}</span>
          </p>
        </div>
        <div class="timeBox" v-else>
          <timer-comp></timer-comp>
        </div>
      </div>
      <!-- 公告栏 -->
      <div class="homeRBottomBox">
        <div class="notifyTitle">
          <h1>最新通知</h1>
          <p>查看更多>>></p>
        </div>
        <div class="notifyContent">
          <h1>端午节放假通知</h1>
          <p>2020年6月25日至6月27日，放假期三天，6月28日（周日）正常上班。</p>
          <p>
            请各部门负责人做好本部门的节前工作安排，并检查相关设施、设备，做好防火、防盗工作，确保办公场所的安全、有序。
          </p>
          <p>预祝全体员工，全体学生及家长，端午节快乐！</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import homeMixins from "../mixins/homeMixins";
import TimerComp from "@/components/TimerComp";
export default {
  data() {
    return {
      bannerList: [
        {
          id: 1,
          src: require("../assets/img/banner1.jpg"),
        },
        {
          id: 2,
          src: require("../assets/img/banner2.jpg"),
        },
        {
          id: 3,
          src: require("../assets/img/banner3.png"),
        },
        {
          id: 4,
          src: require("../assets/img/banner4.jpg"),
        },
        {
          id: 5,
          src: require("../assets/img/banner5.jpg"),
        },
        {
          id: 6,
          src: require("../assets/img/banner6.jpg"),
        },
      ],
      signInText: "",
      signInFlag: false,
    };
  },
  components: {
    TimerComp,
  },
  mixins: [homeMixins],
  methods: {
    // 页面加载查询状态
    selectSignIn() {
      this.seletcSignInStatus({
        name: "SELECTSIGNIN",
        data: {
          studentNum: this.$store.state.loginModules.user.studentNumber,
        },
      }).then((data) => {
        console.log(data);
        if (data.code == 200) {
          let h = parseInt(
            data.data.attendabnceUpdateTime.split(" ")[1].split(":")[0]
          );
          console.log(h);
          this.signInFlag = h < 12 ? true : false; //true是上课打卡，false下课打卡

          if (this.signInFlag) {
            if (data.data.attendabnceAmStatus == 2) {
              this.signInText = "待签到";
            } else if (data.data.attendabnceAmStatus == 0) {
              this.signInText = "已签到";
            } else if (data.data.attendabnceAmStatus == 1) {
              this.signInText = "已迟到";
            } else {
              this.signInText = "无";
            }
          } else {
            if (data.data.attendabncePmStatus == 2) {
              this.signInText = "待签退";
            } else if (data.data.attendabncePmStatus == 0) {
              this.signInText = "已签退";
            } else if (data.data.attendabncePmStatus == 3) {
              this.signInText = "早退打卡";
            } else {
              this.signInText = "无";
            }
          }
        }
      });
    },
    // 签到
    signInFn() {
      this.addSignInStatus({
        name: "ADDSIGNIN",
        data: {
          studentNum: this.$store.state.loginModules.user.studentNumber,
        },
      }).then((data) => {
        console.log(data);
        this.$message({
          message: data,
          type: "success",
        });
        this.selectSignIn();
      });
    },
    // 签退
    signOutFn() {
      this.addSignInStatus({
        name: "ADDSIGNIN",
        data: {
          studentNum: this.$store.state.loginModules.user.studentNumber,
        },
      }).then((data) => {
        console.log(data);
        this.$message({
          message: data,
          type: "success",
        });
        this.selectSignIn();
      });
    },
  },
  created() {
    this.selectSignIn();
  },
};
</script>
<style lang="less" scoped>
.homeBox {
  width: 100%;
  height: 100%;
  display: flex;
}
// 左边内容
.homeMainBox {
  width: 68%;
  height: 96%;
  margin: auto;
  border-radius: 10px;
  margin-right: 8px;
  background-color: rgb(255, 255, 255);
  h1 {
    font-size: 2rem;
    width: 96%;
    height: 3%;
    margin: 0 auto;
    padding: 10px 0;
  }
}
// 右边内容
.homeRightBox {
  width: 29%;
  height: 96%;
  margin: auto;
  border-radius: 10px;
}
// 签到处
.homeRTopBox {
  width: 100%;
  height: 49%;
  border-radius: 10px;
  background-color: white;
  .signInBox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 5rem;
    // border: 1px solid red;
    h3 {
      // border: 1px solid green;
      font-size: 3rem;
      text-align: center;
      cursor: pointer;
    }
    p {
      // border: 1px solid green;
      font-size: 2rem;
      text-align: center;
      color: gray;
      margin-top: 2rem;
      span {
        color: rgb(81, 163, 33);
      }
    }
  }
  .timeBox {
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
// 公告处
.homeRBottomBox {
  width: 100%;
  height: 49%;
  margin-top: 2%;
  border-radius: 10px;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  .notifyTitle {
    width: 100%;
    display: flex;
    h1,
    p {
      width: 50%;
      font-size: 1.6rem;
    }
    p {
      text-align: right;
      cursor: pointer;

    }
  }
  .notifyContent{
    width: 100%;
    font-size: 1.6rem;
    padding-top: 5rem;
    h1{
      text-align: center;
      font-size: 1.8rem;
      padding-bottom: 2rem;
    }
    p{
      text-indent: 2rem;
      line-height: 3rem;
    }
  }
}
// banner
.block {
  width: 96%;
  height: 38%;
  // border: 1px solid green;
  margin: 0 auto;
  margin-bottom: 1rem;
  overflow: hidden;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  img {
    width: 100%;
    // height: 300px;
    height: 100%;
  }
}
// 头条新闻
.mainNewsBox {
  width: 98%;
  height: 46%;
  // height: calc(100%-300px);
  // border: 1px solid red;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    font-size: 1.6rem;
    line-height: 3rem;
    text-indent: 2rem;
  }
  // div {
  //   width: 48%;
  //   height: 100%;
  //   margin: 0 1%;
  //   ul {
  //     height: 100%;
  //     width: 100%;
  //     border-top: 4px solid green;
  //     border-right: 1px solid rgb(190, 190, 190);
  //     border-left: 1px solid rgb(190, 190, 190);
  //     border-bottom: 1px solid rgb(190, 190, 190);
  //     li {
  //       width: 96%;
  //       height: auto;
  //       margin: 10px auto;
  //       display: flex;
  //       justify-content: flex-start;
  //       border-bottom: 1px solid rgb(190, 190, 190);
  //       .newsLiImgBox {
  //         width: 30%;
  //         img {
  //           width: 100%;
  //         }
  //       }
  //       .newsLiTitleBox {
  //         width: 70%;
  //         text-overflow: ellipsis;
  //         a {
  //           font-size: 1.8rem;
  //         }
  //         h4 {
  //           font-size: 1.4rem;
  //           color: rgb(61, 60, 60);
  //           font-weight: 500;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>