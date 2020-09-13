import request from "./request";

export function Login(username, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      username,
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
