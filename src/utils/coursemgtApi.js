import http from './coursemgtrequest';

export default {
  CLASS_ALL:data => http({
    url:  CLASS_ALL,
    method: 'post',
    data: data
  }),
  GRADE_ALL:data => http({
    url:  GRADE_ALL,
    method: 'post',
    data: data
  }),
  SUBJECT_UPDATE: data => http({ // 
    url: SUBJECT_UPDATE,
    method: 'post',
    data: data
  }),
  COURSE_ADD: data => http({ //
    url: COURSE_ADD,
    method: 'post',
    data: data
  }),
  COURSE_DEL: data => http({ // 新增班级
    url: COURSE_DEL,
    method: 'post',
    data: data
  }),
  COURSE_FINDCLASSCOURSE: data => http({ //
    url: COURSE_FINDCLASSCOURSE,
    method: 'post',
    data: data
  }),
  COURSE_UPDATE: data => http({ //
    url: COURSE_UPDATE,
    method: 'post',
    data: data
  }),
}
const CLASS_ALL = '/admin//clazz/selectAll';//所有班级
const GRADE_ALL = '/admin/grade/all';//所有年级
const SUBJECT_UPDATE = '/admin/subject/all';//所有科目
const COURSE_ADD = '/admin/course/add'; //添加课程
const COURSE_DEL = '/admin/course/del'; //删除课程
const COURSE_FINDCLASSCOURSE = '/admin/course/findClassCourse'; //查询班级课表
const COURSE_UPDATE = '/admin/course/update'; //修改课程







