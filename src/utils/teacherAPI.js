import http from './teacherRequest';
export default {
  STAFF_SELECT: data => http({  // 查看教师
    url: STAFF_SELECT,
    method: 'post',
    data: data
  }),
  STAFF_ADD: data => http({  // 添加教师
    url: STAFF_ADD,
    method: 'post',
    data: data
  }),
}
const STAFF_SELECT = '/staff/select';
const STAFF_ADD = '/staff/add';