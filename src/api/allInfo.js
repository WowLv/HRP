import request from "./request";

export function getAllInfo() {
  return request({
    url: "/allInfo",
    method: "get"
  });
}
