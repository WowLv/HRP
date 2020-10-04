import request from "./request";

export function checkResign(fid) {
  return request({
    url: "/checkResign",
    method: "get",
    params: {
      fid
    }
  });
}

export function getNotice(fid) {
  return request({
    url: "/notice",
    method: "get",
    params: {
      fid
    }
  });
}
