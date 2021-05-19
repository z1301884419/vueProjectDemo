import http from './stuParentRequest';
export default {
  SELETE_PARENTS: data => http({  // 添加课程
    url: SELETE_PARENTS,
    method: 'post',
    data: data
  }),
  DELETE_PARENT: data => http({  // 添加课程
    url: DELETE_PARENT,
    method: 'post',
    data: data
  }),
}
const SELETE_PARENTS = '/parent/findHeadteacherParents';//查找班主任所在班级的家长
const DELETE_PARENT = '/parent/delete';