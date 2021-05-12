import http from '../request/teacherRequest';
export default {
  // 查看所有科目
  SUBJECT_ALL: data => http({
    url: SUBJECT_ALL,
    method: 'post',
    data: data
  }),
}
const SUBJECT_ALL = 'subject/all'