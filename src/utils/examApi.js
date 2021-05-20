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
  // 添加考试信息
  ADDEXAM:data=>http({
    url:ADDEXAM,
    method:'post',
    data:data
  }),
  // 取消考试信息
  DELEXAM:data=>http({
    url:DELEXAM,
    method:'post',
    data:data
  }),
  // 查看考试班级
  SELECTCLASSLIST:data=>http({
    url:SELECTCLASSLIST,
    method:'post',
    data:data
  }),
}
const SELECTEXAMALL = '/admin/exam/find'
const SELECTEXAMCLASS='/admin/exam/GradeClass'
const ADDEXAM='/admin/exam/add'
const DELEXAM='/admin/exam/del'
const SELECTCLASSLIST='/admin/exam/lookGradeClass'