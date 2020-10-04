var pagesEnum = {
  home: "控制台",
  info_base: "用户信息",
  map_base: "数据字典档案",
  form_base: "单据格式档案",
  time_base: "考核年度",
  info_modify: "个人信息",
  pw_modify: "密码修改",
  user_register: "用户注册",
  member_file: "人员档案",
  member_register: "人员档案录入",
  person_file: "个人档案",
  entry_apply: "入职申请",
  transfer_apply: "调职申请",
  resign_apply: "离职申请",
  e_r_manage: "入/离职管理",
  transfer_manage: "调职管理",
  teach_load: "基础教学工作量",
  scientific_load: "教科研工作量",
  public_load: "公共工作量"
};

var powerEnum = {
  1: "管理员",
  2: "院长",
  3: "部门主管",
  4: "教务员",
  5: "教师"
};

// var noticeEnum = {
//   1: "您有一条申请信息待审核",
//   2: "您有一条审核完成的信息待查看"
// };

module.exports = {
  pagesEnum,
  powerEnum
  // noticeEnum
};
