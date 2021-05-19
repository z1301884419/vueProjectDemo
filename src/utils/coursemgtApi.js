import http from './coursemgtrequest';

export default {
  CLASS_ALL:data => http({
    url:  CLASS_ALL,
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
const CLASS_ALL = '/clazz/all';//所有班级
const SUBJECT_UPDATE = '/subject/update';
const COURSE_ADD = '/course/add'; //添加课程
const COURSE_DEL = '/course/del'; 
const COURSE_FINDCLASSCOURSE = '/course/findClassCourse'; //查询班级课表
const COURSE_UPDATE = '/course/update'; //修改课程







