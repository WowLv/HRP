import request from "./request";

export function getInfo() {
  return request({
    url: "/personInfo",
    method: "get",
    params: {
      noCheck: true
    }
  });
}

export function setInfo(data) {
  return request({
    url: "/personInfo",
    method: "post",
    data: {
      noCheck: true,
      data
    }
  });
}
