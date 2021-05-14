import http from './homeRequest'

export default{
  // 查询签到状态
  SELECTSIGNIN:data=>http({
    url:SELECTSIGNIN,
    method:'post',
    data:data
  }),
  // 新增打卡
  ADDSIGNIN:data=>http({
    url:ADDSIGNIN,
    method:'post',
    data:data
  }),
}

const SELECTSIGNIN = 'student/attendance/get/status'//查询打卡状态
const ADDSIGNIN = 'student/attendance/add/attendance'//新增打卡