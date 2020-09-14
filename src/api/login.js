import request from "./request";

function handleId(data) {
  if (parseInt(data)) {
    return parseInt(data);
  } else {
    return data;
  }
}

export function Login(user, password) {
  user = handleId(user);
  return request({
    url: "/login",
    method: "post",
    data: {
      user,
      password
    }
  });
}

export function check() {
  return request({
    url: "/check",
    method: "post"
  });
}

export function modifyPw(oldPassword, newPassword) {
  return request({
    url: "/modifyPw",
    method: "post",
    data: {
      oldPassword,
      newPassword,
      noCheck: true
    }
  });
}
