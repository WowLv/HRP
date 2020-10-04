import request from "./request";

export function getInfo(uid) {
  return request({
    url: "/personInfo",
    method: "get",
    params: {
      uid
    }
  });
}

export function setInfo(data) {
  return request({
    url: "/personInfo",
    method: "post",
    data: data
  });
}
