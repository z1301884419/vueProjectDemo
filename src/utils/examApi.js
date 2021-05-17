import http from './examRequest'

export default{
  // 查询对应的所有考勤数据
  SELECTEXAMALL:data=>http({
    url:SELECTEXAMALL,
    method:'post',
    data:data
  }),
  // 查询对应的班级和年级
  SELECTEXAMCLASS:data=>http({
    url:SELECTEXAMCLASS,
    method:'post',
    data:data
  }),
}
const SELECTEXAMALL = '/exam/find'
const SELECTEXAMCLASS='/exam/GradeClass'