import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'//登录

const Home = () => import('../views/Home.vue');//Home页面
const HomePage = () => import('../views/HomePage.vue');//首页
const CheckInMgt = () => import('../views/CheckInMgt.vue');//考勤管理
const CourseMgt = () => import('../views/CourseMgt.vue');//课程管理
const EduAdminiStration = () => import('../views/EduAdminiStration.vue');//教务管理
const ExamMgt = () => import('../views/ExamMgt.vue');//考试管理
const MemoMgt = () => import('../views/MemoMgt.vue');//留言板
const PersonalCenter = () => import('../views/PersonalCenter.vue');//个人中心
const StudentInfo = () => import('../views/StudentInfo.vue');//学生信息管理
const StudentScore = () => import('../views/StudentScore.vue');//学生成绩管理
const StuParentMgt = () => import('../views/StuParentMgt.vue');//学生家长管理
const TeacherInfo = () => import('../views/TeacherInfo.vue');//教师信息管理
const ClassRoomMgt = () => import('../views/ClassRoomMgt.vue');//日志管理
const AddMemoMgt = () => import('../views/AddMemoMgt.vue');//留言关键字管理

// 个人中心
const stuCenter = () => import('../components/yy_StudentInfoDialog.vue');//学生个人中心

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      isLogin: false,
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      isLogin: true,
    },
    children: [
      {
        path: 'HomePage',
        name: 'HomePage',
        component: HomePage,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'CheckInMgt',
        name: 'CheckInMgt',
        component: CheckInMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'CourseMgt',
        name: 'CourseMgt',
        component: CourseMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'EdAdminiStration',
        name: 'EdAdminiStration',
        component: EduAdminiStration,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'ExamMgt',
        name: 'ExamMgt',
        component: ExamMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: '/Home/MmeoMgt',
        name: '/Home/MmeoMgt',
        component: MemoMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'PersonalCenter',
        name: 'PersonalCenter',
        component: PersonalCenter,
        meta: {
          isLogin: true,
        },
        children: [
          {
            path: 'stuCenter',
            name: 'stuCenter',
            component: stuCenter,
            meta: {
              isLogin: true,
            }
          }
        ]
      },
      {
        path: 'StudentInfo',
        name: 'StudentInfo',
        component: StudentInfo,
        meta: {
          isLogin: true,
        }
      },
      {
        path: '/Home/Student/Score',
        name: '/Home/Student/Score',
        component: StudentScore,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'StuParentMgt',
        name: 'StuParentMgt',
        component: StuParentMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'TeacherInfo',
        name: 'TeacherInfo',
        component: TeacherInfo,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'ClassRoomMgt',
        name: 'ClassRoomMgt',
        component: ClassRoomMgt,
        meta: {
          isLogin: true,
        }
      },
      {
        path: 'AddMemoMgt',
        name: 'AddMemoMgt',
        component: AddMemoMgt,
        meta: {
          isLogin: true,
        }
      },
    ],
    redirect: '/Home/HomePage',

  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
