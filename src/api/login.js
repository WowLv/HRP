import request from "./request";
import { handleUser } from "@/lib/validate";

export function Login(user, pwd) {
  user = handleUser(user);
  return request({
    url: "/login",
    method: "post",
    data: {
      user,
      pwd
    }
  });
}

export function check() {
  return request({
    url: "/check",
    method: "post"
  });
}

export function modifyPw(uid, oldPassword, newPassword) {
  return request({
    url: "/modifyPw",
    method: "post",
    data: {
      uid,
      oldPassword,
      newPassword
    }
  });
}

export function register(userData) {
  return request({
    url: "/u_register",
    method: "post",
    data: userData
  });
}

export function getPercent() {
  return request({
    url: "/percent",
    method: "get"
  });
}

export function deleteUser(uid) {
  return request({
    url: "/u_delete",
    method: "post",
    data: {
      uid
    }
  });
}
