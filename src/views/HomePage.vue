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
      <div class="homeRTopBox"></div>

      <!-- 公告栏 -->
      <div class="homeRBottomBox"></div>
    </div>
  </div>
</template>
<script>
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
    };
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
}
// 公告处
.homeRBottomBox {
  width: 100%;
  height: 49%;
  margin-top: 2%;
  border-radius: 10px;
  background-color: white;
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
  p{
    font-size: 1.6rem;
    line-height: 3rem;
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