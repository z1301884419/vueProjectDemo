export const SelectAllSubject= '/subject/all';//查询所有学科
export const SelectAllClass = '/clazz/all';//查询所有班级
export const SelectAllStuXiang = '/student/list';//查询所有学生详情
export const AddStudent = '/student/addStudent';//添加学生
//export const AddStudent = '/student/addStudent';//通过添加学生
export const DelStudent = '/student/deleteIds';//删除学生
export const SetStudent = '/student/updateStudent';//修改学生

export const AllStudentParent = '/student/updateStudent';//查询所有学生家长信息

export const SelsectAllStuScores = '/instructor/score/select/score';//查询班级所有学生成绩信息
export const SelectClassByTeacher = '/clazz/findClazzByStaffId';//查询该老师所教的所有班级
export const SelectScoreByClass = '/instructor/score/findExamByClassId';//通过班级查这个班的所有考试
export const UploadScoreExcel = '/instructor/score/import/excel';//上传excel成绩表