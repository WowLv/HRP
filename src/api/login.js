import request from "./request";

export function Login() {
  return request({
    url: "/login",
    method: "get"
  });
}
