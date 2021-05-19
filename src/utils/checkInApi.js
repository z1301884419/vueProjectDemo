import http from './checkInrequest'

export default{
  // 查询对应的所有考勤数据
  ATTENDANCEALL:data=>http({
    url:ATTENDANCEALL,
    method:'post',
    data:data
  }),
  MODIFYATTDATA:data=>http({
    url:MODIFYATTDATA,
    method:'post',
    data:data
  }),
}
const ATTENDANCEALL = '/attendance/allAttendance'
const MODIFYATTDATA='/attendance/updateAttendance'