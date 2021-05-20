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
  STAFF_DELETE: data => http({  // 删除教师
    url: STAFF_DELETE,
    method: 'post',
    data: data
  }),
  STAFF_UPDATE: data => http({  // 修改教师
    url: STAFF_UPDATE,
    method: 'post',
    data: data
  }),
}
const STAFF_SELECT = '/instructor/staff/select';
const STAFF_ADD = '/instructor/staff/add';
const STAFF_DELETE = '/instructor/staff/delete';
const STAFF_UPDATE = '/instructor/staff/selfInfo/update';
