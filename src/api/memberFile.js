import request from "./request";

export function getPersonFile() {
  return request({
    url: "/personFile",
    method: "get",
    params: {
      noCheck: true
    }
  });
}

export function getMemberFile() {
  return request({
    url: "/memberFile",
    method: "get"
  });
}
