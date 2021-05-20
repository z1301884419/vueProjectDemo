import http from './checkInrequest'

export default{
  // 查询对应的所有考勤数据
  ATTENDANCEALL:data=>http({
    url:ATTENDANCEALL,
    method:'post',
    data:data
  }),
  // 修改
  MODIFYATTDATA:data=>http({
    url:MODIFYATTDATA,
    method:'post',
    data:data
  }),
  // 添加
  ADDATTDATA:data=>http({
    url:ADDATTDATA,
    method:'post',
    data:data
  }),
}
const ATTENDANCEALL = '/attendance/allAttendance'
const MODIFYATTDATA='/attendance/updateAttendance'
const ADDATTDATA='/attendance/addAttendance'