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
  SELECT_DELETE: data => http({ // 删除班级
    url: SELECT_DELETE,
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
const SELECT_DELETE= '/clazz/del';