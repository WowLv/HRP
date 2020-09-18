export function validatePhone(rule, value, callback) {
  if (!value || !value.trim()) {
    callback(new Error("请输入手机号码"));
  } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
}

export function validateUid(rule, value, callback) {
  if (!/[0-9]{5}/.test(value)) {
    callback(new Error("请输入正确的职工号格式"));
  } else {
    callback();
  }
}

export function validateEmail(rule, value, callback) {
  if (
    !/^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
      value
    ) &&
    value
  ) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
}
export function validatePass(rule, value, callback) {
  if (!value || !value.trim()) {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
}

export function validateAge(rule, value, callback) {
  if (!value || !value.trim()) {
    callback(new Error("请输入年龄"));
  } else if (!parseInt(value)) {
    callback(new Error("请输入数字类型"));
  } else {
    callback();
  }
}

export function validateName(rule, value, callback) {
  if (!value || !value.trim()) {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
}

export function handleUser(data) {
  if (parseInt(data)) {
    return parseInt(data);
  } else {
    return data;
  }
}
