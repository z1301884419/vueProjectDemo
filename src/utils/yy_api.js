export const SelectAllSubject= '/admin/subject/all';//查询所有学科--完成
export const SelectAllClass = '/admin/clazz/all';//查询所有班级-完成
export const SelectAllStuXiang = '/student/student/list';//查询所有学生详情-完成
export const AddStudent = '/student/student/addStudent';//添加学生-完成
export const DelStudent = '/student/student/deleteIds';//删除学生-完成
export const DownStuExcel = '/student/student/export/excel';//下载excel表格添加学生-完成
export const AddStuByExcel = '/student/student/add/excel';//上传excel表格添加学生-完成
export const SetStudent = '/student/student/updateStudent';//修改学生-完成

export const AllStudentParent = '/student/updateStudent';//查询所有学生家长信息

export const SelsectAllStuScores = '/instructor/instructor/score/select/score';//查询班级所有学生成绩信息-（完成）
export const SelectClassByTeacher = '/admin/clazz/findClazzByStaffId';//查询该老师所教的所有班级-（完成）
export const SelectScoreByClass = '/instructor/instructor/score/findExamByClassId';//通过班级查这个班的所有考试（完成）
export const SelectScoreByClass2 = '/instructor/instructor/score/findExamByClassId2';//通过班级查这个班的所有考试-完成
export const UploadScoreExcel = '/instructor/instructor/score/import/excel';//上传excel成绩表（完成）
export const SelectTeacher = '/instructor/staff/select';//查询老师的方法（完成）
export const AddStuScoreOne = '/instructor/instructor/score/add/one';//录入单个学生的成绩（完成）
export const UpdateStuScoreOne = '/instructor/instructor/score/update';//修改单个学生的成绩(完成)
export const DelStuScoreOne = '/instructor/instructor/score/delete';//删除单个学生的成绩(完成)
export const DownScoreExcel = '/instructor/instructor/score/export/excel';//删除单个学生的成绩(完成)
