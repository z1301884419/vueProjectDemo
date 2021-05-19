import http from './coursemgtrequest';
export default {
  CLASS_ADD: data => http({  // 添加课程
    url: CLASS_ADD,
    method: 'post',
    data: data
  }),
  CLASS_ALL: data => http({  // 添加课程
    url: CLASS_ALL,
    method: 'post',
    data: data
  }),
  SUBJECT_ADD: data => http({  // 添加科目
    url: SUBJECT_ADD,
    method: 'post',
    data: data
  }),
  SUBJECT_ALL: data => http({ // 查询所有科目
    url: SUBJECT_ALL,
    method: 'post',
    data: data
  }),
  SUBJECT_DEL: data => http({ // 删除科目
    url: SUBJECT_DEL,
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
const CLASS_ADD = '/clazz/add';//添加科目
const CLASS_ALL = '/clazz/all';//所有科目
const SUBJECT_ADD = '/subject/add';
const SUBJECT_ALL = '/subject/all';
const SUBJECT_DEL = '/subject/del';
const SUBJECT_UPDATE = '/subject/update';
const COURSE_ADD = '/course/add'; //添加课程
const COURSE_DEL = '/course/del'; 
const COURSE_FINDCLASSCOURSE = '/course/findClassCourse'; //查询班级课表
const COURSE_UPDATE = '/course/update'; //修改课程







