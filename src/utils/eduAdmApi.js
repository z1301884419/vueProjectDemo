import http from './eduAdmRequest';
export default {
  SUBJECT_ALL: data => http({  // 查看所有科目
    url: SUBJECT_ALL,
    method: 'post',
    data: data
  }),
  CLASS_ALL: data => http({  // 查询第一页班级信息
    url: CLASS_ALL,
    method: 'post',
    data: data
  }),
  GRADE_ALL: data => http({ // 查询所有年级
    url: GRADE_ALL,
    method: 'post',
    data: data
  }),
  CLASS_SELECTBYCONDITION: data => http({ // 根据条件查询班级
    url: CLASS_SELECTBYCONDITION,
    method: 'post',
    data: data
  }),
  CLASSROOM_NOTUSE: data => http({ // 查询所有未使用的教室
    url: CLASSROOM_NOTUSE,
    method: 'post',
    data: data
  }),
  CLASS_TOTALDATA: data => http({ // 查询所有的班级数据
    url: CLASS_TOTALDATA,
    method: 'post',
    data: data
  }),
  CLASS_ADD: data => http({ // 新增班级
    url: CLASS_ADD,
    method: 'post',
    data: data
  }),
  SELECT_HEADERTEACHER: data => http({ // 查询不是班主任的老师
    url: SELECT_HEADERTEACHER,
    method: 'post',
    data: data
  }),
  SELECT_UPDATE: data => http({ // 修改班级
    url: SELECT_UPDATE,
    method: 'post',
    data: data
  }),
  SELECT_UPDATETEACHER: data => http({ // 分配任课教师
    url: SELECT_UPDATETEACHER,
    method: 'post',
    data: data
  }),
  SELECT_UPDATEHEADERTEACHER: data => http({ // 分配班主任
    url: SELECT_UPDATEHEADERTEACHER,
    method: 'post',
    data: data
  }),
  SELECT_CLASSROOMALL: data => http({ // 查询所有教室
    url: SELECT_CLASSROOMALL,
    method: 'post',
    data: data
  }),
  SELECT_CLASSROOMADD: data => http({ // 添加教室
    url: SELECT_CLASSROOMADD,
    method: 'post',
    data: data
  }),
}
const SUBJECT_ALL = 'subject/all';
const CLASS_ALL = '/clazz/selectAll';
const GRADE_ALL = '/grade/all';
const CLASS_SELECTBYCONDITION = '/clazz/selectAll';
const CLASSROOM_NOTUSE= '/classroom/notUse';
const CLASS_TOTALDATA= '/clazz/all';
const CLASS_ADD= '/clazz/add';
const SELECT_HEADERTEACHER= '/staff/headTeacher';
const SELECT_UPDATE= '/clazz/update';
const SELECT_UPDATETEACHER= '/clazz/update/Teacher';
const SELECT_UPDATEHEADERTEACHER= '/clazz/update/headTeacher';
const SELECT_CLASSROOMALL= '/classroom/all';
const SELECT_CLASSROOMADD= '/classroom/add';