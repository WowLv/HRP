import request from "./request";
import { handleUser } from "@/lib/validate";

export function Login(user, password) {
  user = handleUser(user);
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

export function register(userData) {
  return request({
    url: "/register",
    method: "post",
    data: {
      userData
    }
  });
}
